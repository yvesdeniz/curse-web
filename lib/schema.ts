import { pgTable, serial, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';

const timestamps = {
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
};

export const verificationConfig = pgTable('verification_config', {
  guildId:   text('guild_id').primaryKey(),
  channelId: text('channel_id').notNull(),
  roleId:    text('role_id').notNull(),
  messageId: text('message_id'),
  ...timestamps,
});

export const verifiedUsers = pgTable(
  'verified_users',
  {
    id:           serial('id').primaryKey(),
    userId:       text('user_id').notNull(),
    guildId:      text('guild_id').notNull(),
    accessToken:  text('access_token').notNull(),
    refreshToken: text('refresh_token').notNull(),
    tokenType:    text('token_type').notNull().default('Bearer'),
    expiresAt:    timestamp('expires_at', { withTimezone: true }).notNull(),
    ...timestamps,
  },
  (t) => [uniqueIndex('verified_users_user_guild_uq').on(t.userId, t.guildId)],
);
