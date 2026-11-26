import mongoose, { Schema } from 'mongoose';
const options = { timestamps: true, versionKey: false } as const;
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, select: false },
    googleSubject: { type: String, unique: true, sparse: true },
    tenantId: { type: String, required: true, index: true },
    role: { type: String, enum: ['owner', 'member'], required: true, default: 'owner' },
    sessionVersion: { type: Number, required: true, default: 0, min: 0 },
    onboarding: {
      background: { type: String, enum: ['frontend', 'backend', 'fullstack', 'other'] },
      familiarity: { type: String, enum: ['new', 'exploring', 'experienced'] },
      goal: { type: String, enum: ['ai-foundations', 'machine-learning', 'genai-engineering'] },
      dailyMinutes: { type: Number, enum: [10, 20, 30] },
    },
  },
  options,
);
const taskSchema = new Schema(
  {
    tenantId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    status: { type: String, enum: ['todo', 'in_progress', 'done'], default: 'todo' },
    createdBy: { type: String, required: true },
  },
  options,
);
taskSchema.index({ tenantId: 1, _id: -1 });
taskSchema.index({ tenantId: 1, status: 1, _id: -1 });
const auditSchema = new Schema(
  {
    tenantId: { type: String, required: true, index: true },
    actorId: { type: String, required: true },
    action: { type: String, required: true },
    entityType: { type: String, required: true },
    entityId: { type: String, required: true },
    requestId: { type: String },
    at: { type: Date, default: Date.now, immutable: true },
  },
  { versionKey: false },
);
auditSchema.index({ tenantId: 1, at: -1 });
export const UserModel = mongoose.model('User', userSchema);
export const TaskModel = mongoose.model('Task', taskSchema);
export const AuditModel = mongoose.model('Audit', auditSchema);
