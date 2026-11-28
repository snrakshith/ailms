import type { CatalogLesson } from '../learning/catalog.js';
import type { ReviewedContent, User } from '@sapling/contracts';
import { findLesson, catalog } from '../learning/catalog.js';
import { HttpError } from '../../core/errors/http-error.js';
import { ContentDraftModel, ContentReleaseModel } from '../learning/experience.models.js';

export function canAuthor(user: User): boolean {
  return (process.env.CONTENT_AUTHORS ?? '')
    .split(',')
    .map((x) => x.trim().toLowerCase())
    .filter(Boolean)
    .includes(user.email.toLowerCase());
}
export function canReview(user: User): boolean {
  return (process.env.CONTENT_REVIEWERS ?? '')
    .split(',')
    .map((x) => x.trim().toLowerCase())
    .filter(Boolean)
    .includes(user.email.toLowerCase());
}
export function baseLesson(lessonId: string) {
  const lesson = findLesson(lessonId);
  if (!lesson) throw new HttpError(404, 'Lesson not found', 'not_found');
  return lesson;
}
export async function effectiveLesson(lessonId: string): Promise<CatalogLesson> {
  const base = baseLesson(lessonId);
  const release = await ContentReleaseModel.findOne({ lessonId }).sort({ version: -1 }).lean();
  if (!release) return base;
  return {
    ...base,
    title: release.title,
    description: release.description,
    objectives: release.objectives as string[],
    sections: release.sections as CatalogLesson['sections'],
    questions: release.questions as CatalogLesson['questions'],
    version: release.version,
  };
}
export async function listEditorial() {
  const lessons = await Promise.all(
    catalog
      .flatMap((p) => p.lessons)
      .map(async (base) => {
        const [draft, release] = await Promise.all([
          ContentDraftModel.findOne({ lessonId: base.id }).lean(),
          ContentReleaseModel.findOne({ lessonId: base.id }).sort({ version: -1 }).lean(),
        ]);
        return {
          id: base.id,
          title: base.title,
          publishedVersion: release?.version ?? base.version,
          reviewStatus: draft?.reviewStatus ?? null,
        };
      }),
  );
  return lessons;
}
export async function editorialDetail(lessonId: string) {
  const base = baseLesson(lessonId);
  const [draft, published] = await Promise.all([
    ContentDraftModel.findOne({ lessonId }).lean(),
    effectiveLesson(lessonId),
  ]);
  return {
    lessonId,
    baseVersion: base.version,
    draft: draft
      ? {
          status: draft.reviewStatus,
          authorId: draft.authorId,
          content: {
            title: draft.title,
            description: draft.description,
            objectives: draft.objectives,
            sections: draft.sections,
            questions: draft.questions,
          },
        }
      : null,
    published: {
      version: published.version,
      content: {
        title: published.title,
        description: published.description,
        objectives: published.objectives,
        sections: published.sections,
        questions: published.questions,
      },
    },
  };
}
export async function saveDraft(lessonId: string, userId: string, input: ReviewedContent) {
  baseLesson(lessonId);
  const current = await ContentDraftModel.findOne({ lessonId });
  if (current && current.authorId !== userId)
    throw new HttpError(409, 'Another author owns this draft', 'draft_owned');
  if (current?.reviewStatus === 'in_review')
    throw new HttpError(
      409,
      'Submitted content cannot be changed until returned to draft',
      'in_review',
    );
  const draft = await ContentDraftModel.findOneAndUpdate(
    { lessonId },
    { $set: { ...input, authorId: userId, reviewStatus: 'draft' } },
    { upsert: true, new: true, runValidators: true },
  );
  return { id: lessonId, status: draft.reviewStatus };
}
export async function submitReview(lessonId: string, userId: string) {
  const updated = await ContentDraftModel.findOneAndUpdate(
    { lessonId, authorId: userId, reviewStatus: 'draft' },
    { $set: { reviewStatus: 'in_review' } },
    { new: true },
  );
  if (!updated)
    throw new HttpError(409, 'Save your draft before submitting for review', 'no_draft');
  return { id: lessonId, status: 'in_review' };
}
export async function returnDraft(lessonId: string, userId: string) {
  const draft = await ContentDraftModel.findOneAndUpdate(
    { lessonId, reviewStatus: 'in_review', authorId: { $ne: userId } },
    { $set: { reviewStatus: 'draft' } },
    { new: true },
  );
  if (!draft)
    throw new HttpError(
      409,
      'Only an independent reviewer may return this draft',
      'review_forbidden',
    );
  return { id: lessonId, status: 'draft' };
}
export async function publishDraft(lessonId: string, userId: string) {
  const draft = await ContentDraftModel.findOne({
    lessonId,
    reviewStatus: 'in_review',
    authorId: { $ne: userId },
  });
  if (!draft)
    throw new HttpError(
      409,
      'An independent reviewer must approve a submitted draft',
      'review_forbidden',
    );
  const latest = await ContentReleaseModel.findOne({ lessonId }).sort({ version: -1 }).lean();
  const version = Math.max(latest?.version ?? 0, baseLesson(lessonId).version) + 1;
  try {
    await ContentReleaseModel.create({
      lessonId,
      version,
      publishedBy: userId,
      authorId: draft.authorId,
      title: draft.title,
      description: draft.description,
      objectives: draft.objectives,
      sections: draft.sections,
      questions: draft.questions,
    });
  } catch (error) {
    if ((error as { code?: number }).code === 11000)
      throw new HttpError(409, 'Concurrent publication; please retry', 'version_conflict');
    throw error;
  }
  await ContentDraftModel.deleteOne({ _id: draft._id, reviewStatus: 'in_review' });
  return { id: lessonId, status: 'published', version };
}
