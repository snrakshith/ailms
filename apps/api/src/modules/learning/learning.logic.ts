import type { LearningPath, LearningStats, LearnerOnboarding } from '@sapling/contracts';
import { catalog, type CatalogLesson, type CatalogPath } from './catalog.js';
import {
  gradeAnswers,
  lessonUnlocked,
  calculateUtcStreak,
  completionPercentage,
} from '@aiquest/learning-core';

export type CompletedRecord = { lessonId: string; completedAt: Date; xp: number };
export function gradeLesson(lesson: CatalogLesson, answers: Record<string, string>) {
  return gradeAnswers(lesson.questions, answers);
}
export function isUnlocked(lesson: CatalogLesson, completed: Set<string>): boolean {
  const path = catalog.find((path) => path.id === lesson.pathId);
  return path
    ? lessonUnlocked(
        path.lessons.map((v) => v.id),
        lesson.id,
        completed,
      )
    : false;
}
export function formatPaths(completed: Set<string>): LearningPath[] {
  return catalog.map((path: CatalogPath) => {
    const completedLessons = path.lessons.filter((lesson) => completed.has(lesson.id)).length;
    return {
      id: path.id,
      title: path.title,
      subtitle: path.subtitle,
      description: path.description,
      icon: path.icon,
      level: path.level,
      color: path.color,
      lessonCount: path.lessons.length,
      estimatedMinutes: path.lessons.reduce((sum, lesson) => sum + lesson.durationMinutes, 0),
      completedLessons,
      progressPercent: completionPercentage(completedLessons, path.lessons.length),
      lessons: path.lessons.map((lesson, index) => ({
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        durationMinutes: lesson.durationMinutes,
        xp: lesson.xp,
        order: index + 1,
        completed: completed.has(lesson.id),
        unlocked: isUnlocked(lesson, completed),
      })),
    };
  });
}
export function calculateStreak(completions: CompletedRecord[], now = new Date()): number {
  return calculateUtcStreak(completions, now);
}
export function summarize(completions: CompletedRecord[], now = new Date()): LearningStats {
  const completed = new Set(completions.map((v) => v.lessonId));
  return {
    completedLessons: completed.size,
    totalLessons: catalog.reduce((sum, path) => sum + path.lessons.length, 0),
    totalXp: completions.reduce((sum, v) => sum + v.xp, 0),
    streakDays: calculateStreak(completions, now),
    timeInvestedMinutes: catalog
      .flatMap((p) => p.lessons)
      .filter((l) => completed.has(l.id))
      .reduce((sum, l) => sum + l.durationMinutes, 0),
    masteredSkills: catalog
      .filter((path) => path.lessons.every((l) => completed.has(l.id)))
      .map((path) => path.title),
  };
}
export function recommendPath(
  paths: LearningPath[],
  onboarding?: LearnerOnboarding | null,
): LearningPath {
  return paths.find((path) => path.id === onboarding?.goal) ?? paths[0];
}
