import type {
  LibraryResource,
  LessonDetail,
  LearningOverview,
  LearningStats,
  SubmissionInput,
  SubmissionResult,
  User,
  Flashcard,
  FlashcardReviewInput,
} from '@sapling/contracts';
import { HttpError } from '../../core/errors/http-error.js';
import {
  FlashcardReviewModel,
  LessonCompletionModel,
  LessonAttemptModel,
} from './learning.models.js';
import { allLessons, findPath, publicQuestions } from './catalog.js';
import { presentQuestions } from '@aiquest/learning-core';
import { effectiveLesson } from '../content/content.service.js';
import { ContentReleaseModel } from './experience.models.js';
import { assertLearningEntitlement, hasPremium } from '../billing/billing.service.js';
import { requiresPremium } from '../billing/billing.rules.js';
import { cashfreeEnabled } from '../billing/cashfree.provider.js';
import {
  formatPaths,
  gradeLesson,
  isUnlocked,
  recommendPath,
  summarize,
  type CompletedRecord,
} from './learning.logic.js';
import { markReferralQualified } from '../referrals/referral.service.js';
import { queueEmail } from '../notifications/notifications.service.js';
import { UserModel } from '../../infrastructure/database/mongodb/models.js';
import { course } from '@aiquest/curriculum';

async function completionsFor(userId: string): Promise<CompletedRecord[]> {
  const rows = await LessonCompletionModel.find({ userId }).lean();
  return rows.map((row) => ({ lessonId: row.lessonId, completedAt: row.completedAt, xp: row.xp }));
}
export async function listLearningPaths(userId: string) {
  const completed = new Set((await completionsFor(userId)).map((x) => x.lessonId));
  const paths = formatPaths(completed);
  const releases = await ContentReleaseModel.find({}).sort({ version: -1 }).lean();
  const titles = new Map<string, { title: string; description: string }>();
  for (const release of releases) {
    if (!titles.has(release.lessonId))
      titles.set(release.lessonId, { title: release.title, description: release.description });
  }
  const owned = await hasPremium(userId);
  return paths.map((path) => {
    const paywalled = cashfreeEnabled() && requiresPremium(path.id);
    return {
      ...path,
      requiresPurchase: paywalled,
      purchaseUnlocked: !paywalled || owned,
      lessons: path.lessons?.map((lesson) => ({
        ...lesson,
        ...titles.get(lesson.id),
        unlocked: lesson.unlocked && (!paywalled || owned),
      })),
    };
  });
}
export async function getLearningPath(userId: string, pathId: string) {
  if (!findPath(pathId)) throw new HttpError(404, 'Learning path not found', 'not_found');
  const paths = await listLearningPaths(userId);
  return paths.find((path) => path.id === pathId)!;
}
export async function getLearningLesson(userId: string, lessonId: string): Promise<LessonDetail> {
  const lesson = await effectiveLesson(lessonId);
  await assertLearningEntitlement(userId, lesson.pathId);
  const completions = await completionsFor(userId);
  const completed = new Set(completions.map((x) => x.lessonId));
  if (!isUnlocked(lesson, completed))
    throw new HttpError(403, 'Complete the previous lesson to unlock this one', 'lesson_locked');
  const path = findPath(lesson.pathId)!;
  const position = path.lessons.findIndex((v) => v.id === lesson.id);
  return {
    id: lesson.id,
    pathId: lesson.pathId,
    title: lesson.title,
    description: lesson.description,
    durationMinutes: lesson.durationMinutes,
    xp: lesson.xp,
    version: lesson.version,
    objectives: lesson.objectives,
    sections: lesson.sections,
    questions: presentQuestions(
      publicQuestions(lesson.questions),
      `${userId}:${lesson.version}:${lesson.id}`,
    ),
    resources: lesson.resources.map(({ source: _source, ...resource }) => resource),
    completed: completed.has(lesson.id),
    nextLessonId: path.lessons[position + 1]?.id ?? null,
    pathTitle: path.title,
  };
}
export async function getLearningResource(userId: string, resourceId: string) {
  const lesson = allLessons.find((item) =>
    item.resources.some((resource) => resource.id === resourceId),
  );
  if (!lesson) throw new HttpError(404, 'Learning resource not found', 'not_found');
  await assertLearningEntitlement(userId, lesson.pathId);
  return lesson.resources.find((item) => item.id === resourceId)!;
}
export async function listLearningResources(userId: string): Promise<LibraryResource[]> {
  const owned = await hasPremium(userId);
  const seen = new Set<string>();
  const rows: LibraryResource[] = [];
  for (const lesson of allLessons) {
    const premium = cashfreeEnabled() && requiresPremium(lesson.pathId);
    if (premium && !owned) continue;
    for (const resource of lesson.resources) {
      if (seen.has(resource.id)) continue;
      seen.add(resource.id);
      rows.push({
        id: resource.id,
        title: resource.title,
        kind: resource.kind,
        filename: resource.filename,
        pathId: lesson.pathId,
        lessonId: lesson.id,
        moduleId: lesson.id.split('-')[0],
        trackId: lesson.id[0],
      });
    }
  }
  return rows.sort((a, b) => a.kind.localeCompare(b.kind) || a.title.localeCompare(b.title));
}
export async function dueFlashcards(userId: string): Promise<Flashcard[]> {
  const reviews = await FlashcardReviewModel.find({ userId }).lean();
  const byId = new Map(reviews.map((review) => [review.flashcardId, review]));
  const now = new Date();
  return course.flashcards
    .filter((card) => !byId.get(card.id) || byId.get(card.id)!.dueAt <= now)
    .slice(0, 30)
    .map((card) => {
      const review = byId.get(card.id);
      return {
        ...card,
        repetitions: review?.repetitions ?? 0,
        dueAt: review?.dueAt?.toISOString(),
      };
    });
}
export async function reviewFlashcard(
  userId: string,
  flashcardId: string,
  input: FlashcardReviewInput,
): Promise<void> {
  if (!course.flashcards.some((card) => card.id === flashcardId))
    throw new HttpError(404, 'Flashcard not found', 'not_found');
  const previous = await FlashcardReviewModel.findOne({ userId, flashcardId }).lean();
  const base = previous?.intervalDays ?? 0;
  const days =
    input.rating === 'again'
      ? 0
      : input.rating === 'hard'
        ? Math.max(1, base || 1)
        : input.rating === 'good'
          ? Math.max(2, base * 2 || 2)
          : Math.max(4, base * 3 || 4);
  const dueAt = new Date();
  dueAt.setDate(dueAt.getDate() + days);
  await FlashcardReviewModel.findOneAndUpdate(
    { userId, flashcardId },
    {
      $set: { dueAt, intervalDays: days, lastRating: input.rating, reviewedAt: new Date() },
      $inc: { repetitions: 1 },
      $setOnInsert: { userId, flashcardId },
    },
    { upsert: true },
  );
}
export async function learningOverview(user: User): Promise<LearningOverview> {
  const completions = await completionsFor(user.id);
  const paths = await listLearningPaths(user.id);
  const titles = new Map(
    paths.flatMap((p) => p.lessons ?? []).map((lesson) => [lesson.id, lesson.title]),
  );
  return {
    stats: summarize(completions),
    paths,
    recommendedPath: recommendPath(paths, user.onboarding),
    recentCompletions: completions
      .sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime())
      .slice(0, 5)
      .map((row) => ({
        lessonId: row.lessonId,
        title: titles.get(row.lessonId) ?? 'Lesson',
        completedAt: row.completedAt.toISOString(),
        xp: row.xp,
      })),
  };
}
export async function learningProgress(userId: string): Promise<LearningStats> {
  return summarize(await completionsFor(userId));
}
function sameAnswers(a: Record<string, string>, b: Record<string, string>): boolean {
  const left = Object.keys(a).sort();
  const right = Object.keys(b).sort();
  return (
    left.length === right.length &&
    left.every((key, index) => key === right[index] && a[key] === b[key])
  );
}
export async function submitLearningLesson(
  userId: string,
  lessonId: string,
  input: SubmissionInput,
): Promise<SubmissionResult> {
  const lesson = await effectiveLesson(lessonId);
  await assertLearningEntitlement(userId, lesson.pathId);
  const before = await completionsFor(userId);
  const completed = new Set(before.map((row) => row.lessonId));
  if (!isUnlocked(lesson, completed))
    throw new HttpError(403, 'Complete the previous lesson first', 'lesson_locked');
  const graded = gradeLesson(lesson, input.answers);
  // One immutable result per idempotency key. A client retry returns the stored result.
  let attempt;
  try {
    attempt = await LessonAttemptModel.findOneAndUpdate(
      { userId, idempotencyKey: input.idempotencyKey },
      {
        $setOnInsert: {
          userId,
          lessonId,
          lessonVersion: lesson.version,
          idempotencyKey: input.idempotencyKey,
          answers: input.answers,
          scorePercent: graded.scorePercent,
          correctCount: graded.correctCount,
          totalQuestions: graded.totalQuestions,
          passed: graded.passed,
          feedback: graded.feedback,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  } catch (error) {
    if ((error as { code?: number }).code !== 11000) throw error;
    attempt = await LessonAttemptModel.findOne({ userId, idempotencyKey: input.idempotencyKey });
  }
  if (!attempt) throw new HttpError(503, 'Assessment unavailable; retry', 'assessment_unavailable');
  if (
    attempt.lessonId !== lessonId ||
    !sameAnswers(Object.fromEntries(attempt.answers as Map<string, string>), input.answers)
  ) {
    throw new HttpError(
      409,
      'Submission key was already used for another payload',
      'idempotency_conflict',
    );
  }
  let awardedXp = 0;
  if (attempt.passed) {
    try {
      const result = await LessonCompletionModel.updateOne(
        { userId, lessonId },
        {
          $setOnInsert: {
            userId,
            lessonId,
            lessonVersion: attempt.lessonVersion,
            xp: lesson.xp,
            completedAt: new Date(),
          },
        },
        { upsert: true },
      );
      if (result.upsertedCount === 1) {
        awardedXp = lesson.xp;
        void markReferralQualified(userId).catch(() => {});
        void UserModel.findById(userId)
          .lean()
          .then(
            (user) =>
              user &&
              queueEmail(
                'lesson-complete',
                user.email,
                { name: user.name, lesson: lesson.title },
                `lesson:${userId}:${lessonId}`,
              ),
          )
          .catch(() => {});
      }
    } catch (error) {
      if ((error as { code?: number }).code !== 11000) throw error;
    }
  }
  const stats = await learningProgress(userId);
  return {
    attemptId: String(attempt._id),
    passed: attempt.passed,
    scorePercent: attempt.scorePercent,
    correctCount: attempt.correctCount,
    totalQuestions: attempt.totalQuestions,
    feedback: attempt.feedback.map((item) => ({
      questionId: item.questionId!,
      correct: item.correct!,
      correctOptionId: item.correctOptionId!,
      explanation: item.explanation!,
    })),
    awardedXp,
    alreadyCompleted: attempt.passed && awardedXp === 0,
    stats,
  };
}
