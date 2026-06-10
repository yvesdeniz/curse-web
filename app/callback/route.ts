import { createHmac, timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { verifiedUsers, verificationConfig } from '@/lib/schema';

const API = 'https://discord.com/api/v10';

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

interface DiscordUser {
  id: string;
  username: string;
}

/**
 * State format: `base64url(guildId).hmac`, signed by the bot with
 * DISCORD_CLIENT_SECRET (see curse/src/lib/oauth.ts). Returns the guild id
 * if the signature is valid, otherwise null.
 */
function verifyOAuthState(state: string): string | null {
  const [payload, sig] = state.split('.');
  if (!payload || !sig) return null;

  const expected = Buffer.from(
    createHmac('sha256', process.env.DISCORD_CLIENT_SECRET!).update(payload).digest('base64url'),
  );
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;

  return Buffer.from(payload, 'base64url').toString();
}

async function exchangeCode(code: string): Promise<TokenResponse> {
  const res = await fetch(`${API}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id:     process.env.DISCORD_CLIENT_ID!,
      client_secret: process.env.DISCORD_CLIENT_SECRET!,
      grant_type:    'authorization_code',
      code,
      redirect_uri:  process.env.OAUTH_REDIRECT_URI!,
    }),
  });
  if (!res.ok) throw new Error(`Token exchange failed: ${res.status}`);
  return res.json();
}

async function fetchDiscordUser(accessToken: string): Promise<DiscordUser> {
  const res = await fetch(`${API}/users/@me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`User fetch failed: ${res.status}`);
  return res.json();
}

async function assignRole(guildId: string, userId: string, roleId: string): Promise<boolean> {
  const res = await fetch(`${API}/guilds/${guildId}/members/${userId}/roles/${roleId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      'X-Audit-Log-Reason': 'curse OAuth verification',
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    console.error(`[callback] Role assign failed (${res.status}) guild=${guildId} user=${userId} role=${roleId}: ${body}`);
    return false;
  }
  return true;
}

async function sendDM(userId: string): Promise<void> {
  const dmRes = await fetch(`${API}/users/@me/channels`, {
    method: 'POST',
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ recipient_id: userId }),
  });
  if (!dmRes.ok) return;
  const dm = await dmRes.json();
  await fetch(`${API}/channels/${dm.id}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: '✅ You have been successfully verified! Welcome to the server.' }),
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code  = searchParams.get('code');
  const state = searchParams.get('state');

  const host  = request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? 'localhost:3000';
  const proto = request.headers.get('x-forwarded-proto') ?? 'http';
  const to = (path: string) => NextResponse.redirect(`${proto}://${host}${path}`);

  if (!code || !state) return to('/verified?error=Missing+OAuth+parameters.');

  const guildId = verifyOAuthState(state);
  if (!guildId) return to('/verified?error=Invalid+state+parameter.');

  let tokens: TokenResponse;
  try {
    tokens = await exchangeCode(code);
  } catch {
    return to('/verified?error=Could+not+exchange+authorization+code.');
  }

  let user: DiscordUser;
  try {
    user = await fetchDiscordUser(tokens.access_token);
  } catch {
    return to('/verified?error=Could+not+retrieve+your+Discord+profile.');
  }

  try {
    await db.insert(verifiedUsers)
      .values({
        userId:       user.id,
        guildId,
        accessToken:  tokens.access_token,
        refreshToken: tokens.refresh_token,
        tokenType:    tokens.token_type,
        expiresAt:    new Date(Date.now() + tokens.expires_in * 1000),
      })
      .onConflictDoUpdate({
        target: [verifiedUsers.userId, verifiedUsers.guildId],
        set: {
          accessToken:  tokens.access_token,
          refreshToken: tokens.refresh_token,
          tokenType:    tokens.token_type,
          expiresAt:    new Date(Date.now() + tokens.expires_in * 1000),
          updatedAt:    new Date(),
        },
      });

    const [guildConfig] = await db
      .select()
      .from(verificationConfig)
      .where(eq(verificationConfig.guildId, guildId))
      .limit(1);

    if (!guildConfig?.roleId) {
      console.error(
        `[callback] No verification_config row for guild ${guildId} — ` +
        'check that the webapp and the bot use the same DATABASE_URL.',
      );
      return to(
        '/verified?error=' +
        encodeURIComponent('This server has no verification configuration. Ask an admin to re-run the setup command.'),
      );
    }

    const roleAssigned = await assignRole(guildId, user.id, guildConfig.roleId).catch(() => false);
    if (!roleAssigned) {
      return to(
        '/verified?error=' +
        encodeURIComponent(
          'Your account was verified, but the role could not be assigned. ' +
          'The bot may be missing the Manage Roles permission, or its highest role may be below the verified role.',
        ),
      );
    }
  } catch (e) {
    console.error('[callback] DB error:', e);
    return to('/verified?error=A+database+error+occurred.');
  }

  await sendDM(user.id).catch(() => null);

  return to(`/verified?username=${encodeURIComponent(user.username)}`);
}
