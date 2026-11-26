import mongoose, { Schema } from 'mongoose';
const schema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    tokenHash: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    revokedAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false },
);
schema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export const NativeRefreshModel = mongoose.model('NativeRefreshToken', schema);
