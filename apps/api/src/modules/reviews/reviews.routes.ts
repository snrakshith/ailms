import { Router } from 'express';
import { reviewRatingSchema } from '@sapling/contracts';
import { planReview, recommendNextLesson } from '@aiquest/learning-core';
import { findLesson } from '../learning/catalog.js';
import { validateBody } from '../../core/contracts/validate.js';
import { requireAuth } from '../../infrastructure/security/session.js';
import { HttpError } from '../../core/errors/http-error.js';
import { LessonCompletionModel, LessonAttemptModel } from '../learning/learning.models.js';
import { ReviewStateModel, ReviewEventModel } from '../learning/experience.models.js';

async function reviewFeed(userId: string) {
  const [completions, states, attempts] = await Promise.all([
    LessonCompletionModel.find({ userId }).lean(),
    ReviewStateModel.find({ userId }).lean(),
    LessonAttemptModel.find({ userId }).lean(),
  ]);
  const stateById = new Map(states.map((s) => [s.lessonId, s]));
  const scoreById = new Map<string, { total: number; latest: number }>();
  for (const a of attempts) {
    const v = scoreById.get(a.lessonId) ?? { total: 0, latest: 0 };
    v.total++;
    v.latest = a.scorePercent;
    scoreById.set(a.lessonId, v);
  }
  const all = completions.map((c) => {
    const state = stateById.get(c.lessonId);
    const attempted = scoreById.get(c.lessonId);
    const dueAt = state?.dueAt ?? new Date(new Date(c.completedAt).getTime() + 86400000);
    return {
      lessonId: c.lessonId,
      title: findLesson(c.lessonId)?.title ?? c.lessonId,
      dueAt: dueAt.toISOString(),
      intervalDays: state?.intervalDays ?? 1,
      repetitions: state?.repetitions ?? 0,
      lastScore: attempted?.latest ?? 0,
      attempts: attempted?.total ?? 0,
    };
  });
  const now = Date.now();
  const due = all
    .filter((v) => new Date(v.dueAt).getTime() <= now)
    .sort((a, b) => a.dueAt.localeCompare(b.dueAt));
  return { all, due };
}
export function createReviewsRouter() {
  const router = Router();
  router.use(requireAuth);
  router.get('/due', async (req, res) => {
    const { due } = await reviewFeed(req.principal!.id);
    res.json({ data: due });
  });
  router.get('/insights', async (req, res) => {
    const { all, due } = await reviewFeed(req.principal!.id);
    const next = recommendNextLesson(
      all.map((v) => ({
        lessonId: v.lessonId,
        completed: true,
        scorePercent: v.lastScore,
        dueAt: v.dueAt,
        attempts: v.attempts,
      })),
    );
    res.json({
      data: {
        dueCount: due.length,
        reviewedCount: all.filter((v) => v.repetitions > 0).length,
        totalCompleted: all.length,
        nextRecommendedReview: next,
        upcoming: all.sort((a, b) => a.dueAt.localeCompare(b.dueAt)).slice(0, 8),
      },
    });
  });
  router.post('/:lessonId', validateBody(reviewRatingSchema), async (req, res) => {
    const userId = req.principal!.id,
      lessonId = String(req.params.lessonId);
    const completion = await LessonCompletionModel.findOne({ userId, lessonId }).lean();
    if (!completion)
      throw new HttpError(403, 'Complete a lesson before reviewing it', 'review_locked');
    const existing = await ReviewEventModel.findOne({
      userId,
      idempotencyKey: req.body.idempotencyKey,
    }).lean();
    if (existing) {
      if (existing.lessonId !== lessonId || existing.rating !== req.body.rating)
        throw new HttpError(409, 'Review key already used', 'idempotency_conflict');
      res.json({ data: existing.result });
      return;
    }
    const previous = await ReviewStateModel.findOne({ userId, lessonId }).lean();
    const plan = planReview(
      previous
        ? {
            repetitions: previous.repetitions,
            ease: previous.ease,
            intervalDays: previous.intervalDays,
          }
        : null,
      req.body.rating,
      new Date(),
    );
    const result = { lessonId, ...plan, rating: req.body.rating };
    try {
      await ReviewEventModel.create({
        userId,
        lessonId,
        idempotencyKey: req.body.idempotencyKey,
        rating: req.body.rating,
        result,
      });
    } catch (error) {
      if ((error as { code?: number }).code !== 11000) throw error;
      const retry = await ReviewEventModel.findOne({
        userId,
        idempotencyKey: req.body.idempotencyKey,
      }).lean();
      if (!retry || retry.lessonId !== lessonId || retry.rating !== req.body.rating)
        throw new HttpError(409, 'Review key already used', 'idempotency_conflict');
      res.json({ data: retry.result });
      return;
    }
    await ReviewStateModel.updateOne(
      { userId, lessonId },
      { $set: { ...plan, dueAt: new Date(plan.dueAt), lastReviewedAt: new Date() } },
      { upsert: true },
    );
    res.json({ data: result });
  });
  return router;
}
