import { model, models, Schema } from 'mongoose';

const schema = new Schema(
  {
    userId:       { type: String, required: true },
    guildId:      { type: String, required: true },
    accessToken:  { type: String, required: true },
    refreshToken: { type: String, required: true },
    tokenType:    { type: String, required: true, default: 'Bearer' },
    expiresAt:    { type: Date,   required: true },
  },
  { timestamps: true },
);

schema.index({ userId: 1, guildId: 1 }, { unique: true });

export const VerifiedUser = models.VerifiedUser ?? model('VerifiedUser', schema);
