import { model, models, Schema, type InferSchemaType, type Model } from 'mongoose';

const schema = new Schema(
  {
    guildId:   { type: String, required: true, unique: true },
    channelId: { type: String, required: true },
    roleId:    { type: String, required: true },
    messageId: { type: String, default: null },
  },
  { timestamps: true },
);

type Doc = InferSchemaType<typeof schema>;

export const VerificationConfig: Model<Doc> =
  (models.VerificationConfig as Model<Doc> | undefined) ?? model<Doc>('VerificationConfig', schema);
