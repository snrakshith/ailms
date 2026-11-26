import mongoose, { Schema } from 'mongoose';
const opts = { timestamps: true, versionKey: false } as const;
const contentShape = {
  title: { type: String, required: true },
  description: { type: String, required: true },
  objectives: { type: [String], required: true },
  sections: { type: [Schema.Types.Mixed], required: true },
  questions: { type: [Schema.Types.Mixed], required: true },
};
const draftSchema = new Schema(
  {
    lessonId: { type: String, required: true, unique: true },
    authorId: { type: String, required: true },
    reviewStatus: { type: String, enum: ['draft', 'in_review'], default: 'draft' },
    ...contentShape,
  },
  opts,
);
const releaseSchema = new Schema(
  {
    lessonId: { type: String, required: true },
    version: { type: Number, required: true },
    publishedBy: { type: String, required: true },
    authorId: { type: String, required: true },
    ...contentShape,
  },
  opts,
);
releaseSchema.index({ lessonId: 1, version: -1 }, { unique: true });
const reviewStateSchema = new Schema(
  {
    userId: { type: String, required: true },
    lessonId: { type: String, required: true },
    repetitions: { type: Number, default: 0 },
    ease: { type: Number, default: 2.5 },
    intervalDays: { type: Number, default: 0 },
    dueAt: { type: Date, required: true },
    lastReviewedAt: { type: Date },
  },
  opts,
);
reviewStateSchema.index({ userId: 1, lessonId: 1 }, { unique: true });
const reviewEventSchema = new Schema(
  {
    userId: { type: String, required: true },
    lessonId: { type: String, required: true },
    idempotencyKey: { type: String, required: true },
    rating: { type: String, required: true },
    result: { type: Schema.Types.Mixed, required: true },
  },
  opts,
);
reviewEventSchema.index({ userId: 1, idempotencyKey: 1 }, { unique: true });
const tutorQuotaSchema = new Schema(
  {
    userId: { type: String, required: true },
    day: { type: String, required: true },
    count: { type: Number, required: true, default: 0 },
    modelTokens: { type: Number, default: 0 },
  },
  opts,
);
tutorQuotaSchema.index({ userId: 1, day: 1 }, { unique: true });
const tutorEventSchema = new Schema(
  {
    userId: { type: String, required: true },
    lessonId: { type: String, required: true },
    stage: { type: Number, required: true },
    provider: { type: String, required: true },
    questionLength: { type: Number, required: true },
    at: { type: Date, default: Date.now },
  },
  { versionKey: false },
);
const projectSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    slug: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ['draft', 'submitted', 'published'],
      required: true,
      default: 'draft',
    },
    title: String,
    summary: String,
    repositoryUrl: String,
    demoUrl: String,
    track: String,
    skills: [String],
    reflection: String,
    submittedAt: Date,
    publishedAt: Date,
  },
  opts,
);
projectSchema.index({ userId: 1, updatedAt: -1 });
export const ContentDraftModel = mongoose.model('ContentDraft', draftSchema);
export const ContentReleaseModel = mongoose.model('ContentRelease', releaseSchema);
export const ReviewStateModel = mongoose.model('ReviewState', reviewStateSchema);
export const ReviewEventModel = mongoose.model('ReviewEvent', reviewEventSchema);
export const TutorQuotaModel = mongoose.model('TutorQuota', tutorQuotaSchema);
export const TutorEventModel = mongoose.model('TutorEvent', tutorEventSchema);
export const CapstoneProjectModel = mongoose.model('CapstoneProject', projectSchema);
