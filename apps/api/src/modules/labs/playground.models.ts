import mongoose, { Schema } from 'mongoose';
const schema = new Schema(
  {
    userId: { type: String, required: true },
    day: { type: String, required: true },
    count: { type: Number, required: true, default: 0 },
  },
  { timestamps: true, versionKey: false },
);
schema.index({ userId: 1, day: 1 }, { unique: true });
export const ModelComparisonQuotaModel = mongoose.model('ModelComparisonQuota', schema);
