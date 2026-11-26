import { describe, it, expect } from 'vitest';
import { reviewedContentSchema, projectSchema } from '@sapling/contracts';
import {
  compareTexts,
  planReview,
  presentQuestions,
  confusionMatrix,
} from '@aiquest/learning-core';
import { catalog, publicQuestions } from '../src/modules/learning/catalog.js';
describe('P1 portable learning rules', () => {
  it('schedules review harder when recalled poorly', () => {
    const date = new Date('2026-11-23T00:00:00Z');
    const start = planReview(null, 'good', date);
    expect(start.intervalDays).toBe(1);
    expect(planReview(start, 'again', date).repetitions).toBe(0);
  });
  it('preserves question IDs and never exposes correct answers', () => {
    const questions = publicQuestions(catalog[0].lessons[0].questions);
    expect(questions.some((q) => 'correctOptionId' in q)).toBe(false);
    const randomized = presentQuestions(questions, 'learner-A');
    expect(randomized.map((q) => q.id).sort()).toEqual(questions.map((q) => q.id).sort());
  });
  it('produces realistic metrics and normalized word similarity', () => {
    expect(compareTexts('react state', 'react state').similarity).toBe(1);
    expect(confusionMatrix([true, false], [true, false]).accuracy).toBe(1);
  });
  it('requires validated content and safe publication fields', () => {
    const lesson = catalog[0].lessons[0];
    const input = {
      title: lesson.title,
      description: lesson.description,
      objectives: lesson.objectives,
      sections: lesson.sections,
      questions: lesson.questions,
    };
    expect(reviewedContentSchema.safeParse(input).success).toBe(true);
    expect(
      reviewedContentSchema.safeParse({
        ...input,
        questions: [{ ...lesson.questions[0], correctOptionId: 'not-a-choice' }],
      }).success,
    ).toBe(false);
    expect(
      projectSchema.safeParse({
        title: 'Example',
        summary: 'A'.repeat(40),
        repositoryUrl: 'javascript:alert(1)',
        track: 'ai-foundations',
        skills: ['ML'],
        reflection: 'B'.repeat(40),
      }).success,
    ).toBe(false);
  });
});
