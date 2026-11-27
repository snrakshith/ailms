import { describe, it, expect } from 'vitest';
import { catalog, findLesson, publicQuestions } from '../src/modules/learning/catalog.js';
import {
  calculateStreak,
  formatPaths,
  gradeLesson,
  isUnlocked,
  recommendPath,
  summarize,
} from '../src/modules/learning/learning.logic.js';

describe('catalog contracts', () => {
  it('uses the complete canonical curriculum with stable lesson IDs', () => {
    const lessons = catalog.flatMap((path) => path.lessons);
    expect(new Set(lessons.map((x) => x.id)).size).toBe(lessons.length);
    expect(catalog).toHaveLength(6);
    expect(lessons).toHaveLength(106);
    expect(lessons.every((x) => /^[FMDCPG]\d{2}-L\d{2}$/.test(x.id))).toBe(true);
  });
  it('keeps instructor-only answer keys out of the learner catalog', () => {
    const lesson = findLesson('F01-L01')!;
    expect(lesson.questions).toEqual([]);
    expect(JSON.stringify(publicQuestions(lesson.questions))).not.toContain('correctOptionId');
    expect(JSON.stringify(publicQuestions(lesson.questions))).not.toContain('explanation');
  });
});
describe('assessment and progression', () => {
  const lesson = findLesson('F01-L01')!;
  it('records a reflective lesson completion without embedding answer keys', () => {
    expect(gradeLesson(lesson, {})).toMatchObject({
      passed: true,
      correctCount: 0,
      totalQuestions: 0,
      scorePercent: 100,
    });
  });
  it('unlocks the next lesson after its prerequisite is mastered', () => {
    const next = findLesson('F01-L02')!;
    expect(isUnlocked(next, new Set())).toBe(false);
    expect(isUnlocked(next, new Set(['F01-L01']))).toBe(true);
    expect(isUnlocked(findLesson('G01-L01')!, new Set())).toBe(true);
  });
  it('recommends the onboarding goal but keeps every path accessible', () => {
    const paths = formatPaths(new Set());
    expect(
      recommendPath(paths, {
        background: 'frontend',
        familiarity: 'new',
        goal: 'genai-engineering',
        dailyMinutes: 10,
      }).id,
    ).toBe('genai-engineering');
    expect(paths.every((path) => path.lessons![0].unlocked)).toBe(true);
  });
  it('derives XP and mastered skills from actual completions', () => {
    const completions = catalog[0].lessons.map((x) => ({
      lessonId: x.id,
      completedAt: new Date('2026-11-23T09:00:00Z'),
      xp: x.xp,
    }));
    expect(summarize(completions, new Date('2026-11-23T18:00:00Z'))).toMatchObject({
      completedLessons: catalog[0].lessons.length,
      totalXp: completions.reduce((sum, item) => sum + item.xp, 0),
      streakDays: 1,
      masteredSkills: ['Foundations'],
    });
  });
  it('continues streaks when the last activity was yesterday, but not before', () => {
    expect(
      calculateStreak(
        [
          { lessonId: 'a', completedAt: new Date('2026-11-21T23:00:00Z') },
          { lessonId: 'b', completedAt: new Date('2026-11-22T09:00:00Z') },
        ],
        new Date('2026-11-23T09:00:00Z'),
      ),
    ).toBe(2);
    expect(
      calculateStreak(
        [{ lessonId: 'a', completedAt: new Date('2026-11-20T09:00:00Z') }],
        new Date('2026-11-23T09:00:00Z'),
      ),
    ).toBe(0);
  });
});
