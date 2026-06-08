import { model, models, Schema } from 'mongoose';

const schema = new Schema(
  {
    guildId:   { type: String, required: true, unique: true },
    channelId: { type: String, required: true },
    roleId:    { type: String, required: true },
    messageId: { type: String, default: null },
  },
  { timestamps: true },
);

export const VerificationConfig = models.VerificationConfig ?? model('VerificationConfig', schema);
