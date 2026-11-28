import { describe, it, expect } from 'vitest';
import { catalog, findLesson, publicQuestions } from '../src/modules/learning/catalog.js';
import { course, courses, devopsCourse, dsaCourse } from '@aiquest/curriculum';
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
    expect(catalog).toHaveLength(16);
    expect(lessons).toHaveLength(217);
    expect(lessons).toContainEqual(expect.objectContaining({ id: 'OPSF01-L01' }));
    expect(lessons).toContainEqual(expect.objectContaining({ id: 'DSA01-L01' }));
  });
  it('keeps instructor-only answer keys out of the learner catalog', () => {
    const lesson = findLesson('F01-L01')!;
    expect(lesson.questions).toEqual([]);
    expect(JSON.stringify(publicQuestions(lesson.questions))).not.toContain('correctOptionId');
    expect(JSON.stringify(publicQuestions(lesson.questions))).not.toContain('explanation');
  });
  it('indexes learner resources without exposing instructor material', () => {
    expect(course.assets.length).toBeGreaterThan(200);
    expect(course.assets.some((asset) => asset.kind === 'notebook')).toBe(true);
    expect(course.assets.some((asset) => asset.kind === 'visualization')).toBe(true);
    expect(course.assets.some((asset) => asset.path.includes('instructor-material'))).toBe(false);
    expect(course.flashcards).toHaveLength(212);
    expect(devopsCourse.lessons).toHaveLength(47);
    expect(dsaCourse.lessons).toHaveLength(64);
    expect(courses.flatMap((subject) => subject.flashcards)).toHaveLength(434);
    expect(
      courses
        .flatMap((subject) => subject.assets)
        .some((asset) => asset.path.includes('solutions')),
    ).toBe(false);
  });
  it('provides one accessible primary SVG visual for every lesson', () => {
    for (const subject of courses) {
      const visuals = subject.assets.filter((asset) => asset.primaryVisual);
      expect(visuals).toHaveLength(subject.lessons.length);
      expect(new Set(visuals.map((asset) => asset.lessonId)).size).toBe(subject.lessons.length);
      for (const visual of visuals) {
        expect(visual.kind).toBe('diagram');
        expect(visual.source).toMatch(/^<svg /);
        expect(visual.mermaidSource).toContain('flowchart');
        expect(visual.altText).toBeTruthy();
        expect(visual.caption).toBeTruthy();
      }
    }
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
