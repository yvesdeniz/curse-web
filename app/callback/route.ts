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

async function assignRole(guildId: string, userId: string, roleId: string): Promise<void> {
  await fetch(`${API}/guilds/${guildId}/members/${userId}/roles/${roleId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      'X-Audit-Log-Reason': 'curse OAuth verification',
    },
  });
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

  let guildId: string;
  try {
    guildId = Buffer.from(state, 'base64url').toString();
  } catch {
    return to('/verified?error=Invalid+state+parameter.');
  }

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

    if (guildConfig?.roleId) {
      await assignRole(guildId, user.id, guildConfig.roleId).catch(() => null);
    }
  } catch (e) {
    console.error('[callback] DB error:', e);
    return to('/verified?error=A+database+error+occurred.');
  }

  await sendDM(user.id).catch(() => null);

  return to(`/verified?username=${encodeURIComponent(user.username)}`);
}
