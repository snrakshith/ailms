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
  it('uses stable, unique slugs and exactly 3 questions per lesson', () => {
    const lessons = catalog.flatMap((path) => path.lessons);
    expect(new Set(lessons.map((x) => x.id)).size).toBe(lessons.length);
    expect(lessons).toHaveLength(9);
    expect(lessons.every((x) => x.questions.length === 3)).toBe(true);
  });
  it('never leaks answer keys in a public lesson', () => {
    const lesson = findLesson('ai-vs-software')!;
    expect(JSON.stringify(publicQuestions(lesson.questions))).not.toContain('correctOptionId');
    expect(JSON.stringify(publicQuestions(lesson.questions))).not.toContain('explanation');
  });
});
describe('assessment and progression', () => {
  const lesson = findLesson('ai-vs-software')!;
  it('passes 2/3 and fails 1/3, with server-granted XP only on completion', () => {
    const answers = Object.fromEntries(
      lesson.questions.map((q, i) => [q.id, i < 2 ? q.correctOptionId : 'wrong']),
    );
    expect(gradeLesson(lesson, answers)).toMatchObject({
      passed: true,
      correctCount: 2,
      scorePercent: 67,
    });
    expect(gradeLesson(lesson, { q1: 'wrong', q2: 'wrong', q3: 'c' })).toMatchObject({
      passed: false,
      correctCount: 1,
    });
  });
  it('unlocks the next lesson after its prerequisite is mastered', () => {
    const next = findLesson('data-and-features')!;
    expect(isUnlocked(next, new Set())).toBe(false);
    expect(isUnlocked(next, new Set(['ai-vs-software']))).toBe(true);
    expect(isUnlocked(findLesson('llm-building-blocks')!, new Set())).toBe(true);
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
      xp: 50,
    }));
    expect(summarize(completions, new Date('2026-11-23T18:00:00Z'))).toMatchObject({
      completedLessons: 3,
      totalXp: 150,
      streakDays: 1,
      masteredSkills: ['AI Foundations'],
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
