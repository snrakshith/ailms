import { readFileSync } from 'node:fs';

export type CourseQuestion = {
  id: string;
  type: 'short_answer' | 'scenario';
  prompt: string;
  points: number;
};

export type CourseLesson = {
  id: string;
  moduleId: string;
  trackId: string;
  title: string;
  level: string;
  durationMinutes: number;
  objectives: string[];
  concepts: string;
  workedExample: string;
  commonPitfall: string;
  exercise: { task: string; acceptanceCriteria: string };
  knowledgeChecks: CourseQuestion[];
  contentPath: string;
};

export type CourseModule = {
  id: string;
  trackId: string;
  title: string;
  lessonIds: string[];
  durationMinutes: number;
  prerequisiteModuleIds: string[];
};

export type CourseTrack = {
  id: string;
  title: string;
  order: number;
  moduleIds: string[];
  suggestedWeeks: number;
  durationMinutes: number;
};

type RawCurriculum = {
  curriculum_id: string;
  title: string;
  tracks: Array<{
    id: string;
    title: string;
    order: number;
    module_ids: string[];
    suggested_weeks: number;
    estimated_minutes: number;
  }>;
  modules: Array<{
    id: string;
    track_id: string;
    title: string;
    lesson_ids: string[];
    estimated_minutes: number;
    prerequisite_module_ids: string[];
  }>;
};

type RawLesson = {
  id: string;
  module_id: string;
  track_id: string;
  title: string;
  level: string;
  estimated_minutes: number;
  learning_objectives: string[];
  concepts: string;
  worked_example: string;
  common_pitfall: string;
  exercise: { task: string; acceptance_criteria: string };
  content_path: string;
};

type RawQuestion = {
  id: string;
  lesson_id: string;
  type: CourseQuestion['type'];
  question: string;
  points: number;
};

const data = (name: string) => new URL(`../data/${name}`, import.meta.url);
const curriculum = JSON.parse(
  readFileSync(data('catalog/curriculum.json'), 'utf8'),
) as RawCurriculum;
const rawLessons = readFileSync(data('catalog/lessons.jsonl'), 'utf8')
  .trim()
  .split('\n')
  .map((line) => JSON.parse(line) as RawLesson);
const rawQuestions = JSON.parse(
  readFileSync(data('assessments/learner-questions.json'), 'utf8'),
) as RawQuestion[];

const contentDirectories: Record<string, string> = {
  F: 'foundations',
  M: 'machine-learning',
  D: 'deep-learning',
  C: 'computer-vision',
  G: 'generative-ai-agent-engineering',
  P: 'production-ai-engineering',
};

export const course = {
  id: curriculum.curriculum_id,
  title: curriculum.title,
  tracks: curriculum.tracks.map((track): CourseTrack => ({
    id: track.id,
    title: track.title,
    order: track.order,
    moduleIds: track.module_ids,
    suggestedWeeks: track.suggested_weeks,
    durationMinutes: track.estimated_minutes,
  })),
  modules: curriculum.modules.map((module): CourseModule => ({
    id: module.id,
    trackId: module.track_id,
    title: module.title,
    lessonIds: module.lesson_ids,
    durationMinutes: module.estimated_minutes,
    prerequisiteModuleIds: module.prerequisite_module_ids,
  })),
  lessons: rawLessons.map((lesson): CourseLesson => ({
    id: lesson.id,
    moduleId: lesson.module_id,
    trackId: lesson.track_id,
    title: lesson.title,
    level: lesson.level,
    durationMinutes: lesson.estimated_minutes,
    objectives: lesson.learning_objectives,
    concepts: lesson.concepts,
    workedExample: lesson.worked_example,
    commonPitfall: lesson.common_pitfall,
    exercise: {
      task: lesson.exercise.task,
      acceptanceCriteria: lesson.exercise.acceptance_criteria,
    },
    knowledgeChecks: rawQuestions
      .filter((question) => question.lesson_id === lesson.id)
      .map((question) => ({
        id: question.id,
        type: question.type,
        prompt: question.question,
        points: question.points,
      })),
    contentPath: lesson.content_path.replace(
      /^content\/[A-Z]\//,
      `lesson-content/${contentDirectories[lesson.track_id]}/`,
    ),
  })),
} as const;
