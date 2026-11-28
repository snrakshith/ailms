import { readFileSync, readdirSync, statSync } from 'node:fs';

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
  codeExamples: CourseCodeExample[];
};

export type CourseCodeExample = {
  id: string;
  moduleId: string;
  title: string;
  path: string;
  dependencies: string[];
  executionMode: string;
  source: string;
};

export type CourseNotebook = {
  id: string;
  trackId: string;
  title: string;
  path: string;
  source: string;
};

export type CourseAssetKind =
  | 'code'
  | 'notebook'
  | 'reading'
  | 'diagram'
  | 'visualization'
  | 'lab'
  | 'flashcards'
  | 'dataset'
  | 'pathway'
  | 'capstone'
  | 'other';
export type CourseAsset = {
  id: string;
  title: string;
  kind: CourseAssetKind;
  path: string;
  trackId?: string;
  moduleId?: string;
  lessonId?: string;
  source: string;
};
export type CourseFlashcard = {
  id: string;
  front: string;
  back: string;
  tags: string[];
  trackId?: string;
  moduleId?: string;
};

export type CourseModule = {
  id: string;
  trackId: string;
  title: string;
  lessonIds: string[];
  durationMinutes: number;
  prerequisiteModuleIds: string[];
};
export type CurriculumCourse = {
  id: string;
  title: string;
  tracks: CourseTrack[];
  modules: CourseModule[];
  lessons: CourseLesson[];
  assets: CourseAsset[];
  flashcards: CourseFlashcard[];
  codeExamples?: CourseCodeExample[];
  notebooks?: CourseNotebook[];
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

type RawCodeExample = {
  module_id: string;
  path: string;
  name: string;
  dependencies: string[];
  execution_mode: string;
};
type RawLinkedAsset = {
  id: string;
  lesson_id: string;
  title: string;
  path?: string;
  guide_path?: string;
  starter_path?: string;
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
const rawCodeExamples = JSON.parse(
  readFileSync(data('resources/data/code-index.json'), 'utf8'),
) as RawCodeExample[];

const codeExamples = rawCodeExamples.map((example): CourseCodeExample => ({
  id: `${example.module_id}:${example.name}`,
  moduleId: example.module_id,
  title: example.name,
  path: `resources/${example.path}`,
  dependencies: example.dependencies,
  executionMode: example.execution_mode,
  source: readFileSync(data(`resources/${example.path}`), 'utf8'),
}));

const notebookTracks: Record<string, string> = {
  F: 'Foundations',
  M: 'Machine Learning',
  D: 'Deep Learning',
  C: 'Computer Vision',
  G: 'Generative AI and Agent Engineering',
  P: 'Production AI Engineering',
};
const notebooks = Object.entries(notebookTracks).map(([trackId, title]): CourseNotebook => {
  const path = `resources/notebooks/${trackId}-offline-labs.ipynb`;
  return {
    id: `notebook:${trackId}`,
    trackId,
    title: `${title} offline labs notebook`,
    path,
    source: readFileSync(data(path), 'utf8'),
  };
});

const assetRoot = data('resources/');
const assetKind = (path: string): CourseAssetKind => {
  if (path.startsWith('code/') || path.includes('/starters/') || path.startsWith('starter-code/'))
    return 'code';
  if (path.startsWith('notebooks/')) return 'notebook';
  if (path.startsWith('diagrams/')) return 'diagram';
  if (path.startsWith('visualizations/')) return 'visualization';
  if (path.startsWith('labs/')) return 'lab';
  if (path.startsWith('flashcards/')) return 'flashcards';
  if (path.startsWith('datasets/')) return 'dataset';
  if (path.startsWith('pathways/')) return 'pathway';
  if (path.startsWith('projects/')) return 'capstone';
  if (/^(chapters|cheatsheets|guides|cases|assessments)\//.test(path)) return 'reading';
  return 'other';
};
const rawLabs = JSON.parse(
  readFileSync(data('resources/data/labs.json'), 'utf8'),
) as RawLinkedAsset[];
const rawVisualizations = JSON.parse(
  readFileSync(data('resources/data/visualizations.json'), 'utf8'),
) as RawLinkedAsset[];
const linkedAssets = new Map<string, string>();
for (const item of [...rawLabs, ...rawVisualizations])
  for (const path of [item.path, item.guide_path, item.starter_path])
    if (path) linkedAssets.set(path, item.lesson_id);
const assetPaths = readdirSync(assetRoot, { recursive: true, encoding: 'utf8' }).filter(
  (path): path is string => typeof path === 'string' && statSync(new URL(path, assetRoot)).isFile(),
);
const assets = assetPaths.map((path): CourseAsset => {
  const moduleId = path.match(/(?:code|chapters|cheatsheets|diagrams)\/([FMDCPG]\d{2})/)?.[1];
  const trackId = path
    .match(/^notebooks\/([FMDCPG])-|(?:^|\/)([FMDCPG])\d{2}/)
    ?.slice(1)
    .find(Boolean);
  return {
    id: `asset:${path}`,
    title: path
      .split('/')
      .at(-1)!
      .replace(/\.(md|py|ipynb|svg|html|mmd|json|csv|tsv)$/, ''),
    kind: assetKind(path),
    path,
    trackId,
    moduleId,
    lessonId: linkedAssets.get(path),
    source: readFileSync(new URL(path, assetRoot), 'utf8'),
  };
});
const flashcards = readFileSync(data('resources/flashcards/anki.tsv'), 'utf8')
  .trim()
  .split('\n')
  .slice(1)
  .map((line, index): CourseFlashcard => {
    const [front, back, tags = ''] = line.replace(/\r$/, '').split('\t');
    const parts = tags.split(/\s+/).filter(Boolean);
    const moduleId = parts.find((tag) => /^[FMDCPG]\d{2}$/.test(tag));
    return {
      id: `flashcard:${index + 1}`,
      front,
      back,
      tags: parts,
      trackId: parts.find((tag) => /^[FMDCPG]$/.test(tag)),
      moduleId,
    };
  });

const contentDirectories: Record<string, string> = {
  F: 'foundations',
  M: 'machine-learning',
  D: 'deep-learning',
  C: 'computer-vision',
  G: 'generative-ai-agent-engineering',
  P: 'production-ai-engineering',
};

type ExternalRawLesson = Omit<RawLesson, 'concepts'> & {
  concepts: string[];
  exercise: { task: string; acceptance_criteria: string[] };
};
type ExternalCurriculum = Omit<RawCurriculum, 'tracks' | 'modules'> & {
  tracks: Array<
    Omit<RawCurriculum['tracks'][number], 'suggested_weeks'> & { suggested_weeks?: number }
  >;
  modules: RawCurriculum['modules'];
};
function externalAssetKind(path: string): CourseAssetKind {
  if (
    path.startsWith('content/') ||
    /^(chapters|cheatsheets|guides|cases|assessments)\//.test(path)
  )
    return 'reading';
  if (path.startsWith('labs/') || path.startsWith('starter-code/'))
    return path.includes('/starters/') || path.startsWith('starter-code/') ? 'code' : 'lab';
  return assetKind(path);
}
function loadExternalCourse(folder: string): CurriculumCourse {
  const root = data(`courses/${folder}/`);
  const external = JSON.parse(
    readFileSync(new URL('data/curriculum.json', root), 'utf8'),
  ) as ExternalCurriculum;
  const lessons = readFileSync(new URL('data/lessons.jsonl', root), 'utf8')
    .trim()
    .split('\n')
    .map((line) => JSON.parse(line) as ExternalRawLesson);
  const labs = JSON.parse(
    readFileSync(new URL('data/labs.json', root), 'utf8'),
  ) as RawLinkedAsset[];
  const visualizations = JSON.parse(
    readFileSync(new URL('data/visualizations.json', root), 'utf8'),
  ) as RawLinkedAsset[];
  const linked = new Map<string, string>();
  for (const item of [...labs, ...visualizations])
    for (const path of [
      item.path,
      item.guide_path,
      item.starter_path,
      (item as { notebook_path?: string }).notebook_path,
      (item as { content_path?: string }).content_path,
    ])
      if (path) linked.set(path, item.lesson_id);
  const paths = readdirSync(root, { recursive: true, encoding: 'utf8' }).filter(
    (path): path is string =>
      typeof path === 'string' &&
      !path.startsWith('data/') &&
      statSync(new URL(path, root)).isFile(),
  );
  const assets = paths.map((path): CourseAsset => {
    const moduleId = path.match(
      /(?:content\/[^/]+\/|chapters\/|cheatsheets\/|diagrams\/)([A-Z]+\d{2})/,
    )?.[1];
    const trackId = external.modules.find((module) => module.id === moduleId)?.track_id;
    return {
      id: `asset:${folder}:${path}`,
      title: path
        .split('/')
        .at(-1)!
        .replace(/\.(md|py|ipynb|svg|html|mmd|json|csv|tsv|ya?ml|tf|rego)$/, ''),
      kind: externalAssetKind(path),
      path: `courses/${folder}/${path}`,
      trackId,
      moduleId,
      lessonId: linked.get(path),
      source: readFileSync(new URL(path, root), 'utf8'),
    };
  });
  const flashcards = readFileSync(new URL('flashcards/anki.tsv', root), 'utf8')
    .trim()
    .split('\n')
    .slice(1)
    .map((line, index): CourseFlashcard => {
      const [front, back, tags = ''] = line.replace(/\r$/, '').split('\t');
      const parts = tags.split(/\s+/).filter(Boolean);
      const moduleId = parts.find((tag) => external.modules.some((module) => module.id === tag));
      return {
        id: `flashcard:${folder}:${index + 1}`,
        front,
        back,
        tags: parts,
        moduleId,
        trackId: external.modules.find((module) => module.id === moduleId)?.track_id,
      };
    });
  return {
    id: external.curriculum_id,
    title: external.title,
    tracks: external.tracks.map((track) => ({
      id: track.id,
      title: track.title,
      order: track.order,
      moduleIds: track.module_ids,
      suggestedWeeks:
        track.suggested_weeks ?? Math.max(1, Math.round(track.estimated_minutes / 180)),
      durationMinutes: track.estimated_minutes,
    })),
    modules: external.modules.map((module) => ({
      id: module.id,
      trackId: module.track_id,
      title: module.title,
      lessonIds: module.lesson_ids,
      durationMinutes: module.estimated_minutes,
      prerequisiteModuleIds: module.prerequisite_module_ids,
    })),
    lessons: lessons.map((lesson) => ({
      id: lesson.id,
      moduleId: lesson.module_id,
      trackId: lesson.track_id,
      title: lesson.title,
      level: lesson.level,
      durationMinutes: lesson.estimated_minutes,
      objectives: lesson.learning_objectives,
      concepts: lesson.concepts.join('\n\n'),
      workedExample: lesson.worked_example,
      commonPitfall: lesson.common_pitfall,
      exercise: {
        task: lesson.exercise.task,
        acceptanceCriteria: lesson.exercise.acceptance_criteria.join('\n'),
      },
      knowledgeChecks: [],
      contentPath: `courses/${folder}/${lesson.content_path}`,
      codeExamples: [],
    })),
    assets,
    flashcards,
  };
}

export const course: CurriculumCourse = {
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
  codeExamples,
  notebooks,
  assets,
  flashcards,
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
    codeExamples: codeExamples.filter((example) => example.moduleId === lesson.module_id),
  })),
};
export const devopsCourse = loadExternalCourse('devops');
export const dsaCourse = loadExternalCourse('dsa');
export const courses = [course, devopsCourse, dsaCourse] as const;
