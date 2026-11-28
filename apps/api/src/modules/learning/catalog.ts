import {
  course,
  devopsCourse,
  dsaCourse,
  type CourseAssetKind,
  type CurriculumCourse,
} from '@aiquest/curriculum';
import type { LessonQuestion, LessonSection } from '@sapling/contracts';

export type CatalogResource = {
  id: string;
  title: string;
  kind: CourseAssetKind;
  filename: string;
  source: string;
};

type Question = {
  id: string;
  prompt: string;
  options: { id: string; label: string }[];
  correctOptionId: string;
  explanation: string;
};

export type CatalogLesson = {
  id: string;
  pathId: string;
  title: string;
  description: string;
  durationMinutes: number;
  xp: number;
  version: number;
  objectives: string[];
  sections: LessonSection[];
  questions: Question[];
  resources: CatalogResource[];
};

export type CatalogPath = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  level: string;
  color: string;
  lessons: CatalogLesson[];
};

const presentation: Record<string, Pick<CatalogPath, 'id' | 'subtitle' | 'icon' | 'color'>> = {
  F: {
    id: 'ai-foundations',
    subtitle: 'Python, maths and developer tooling',
    icon: 'sparkles',
    color: 'mint',
  },
  M: {
    id: 'machine-learning',
    subtitle: 'From datasets to dependable models',
    icon: 'chart',
    color: 'violet',
  },
  D: {
    id: 'deep-learning',
    subtitle: 'Neural networks and training systems',
    icon: 'brain',
    color: 'orange',
  },
  C: {
    id: 'computer-vision',
    subtitle: 'Images, video and multimodal perception',
    icon: 'eye',
    color: 'blue',
  },
  G: {
    id: 'genai-engineering',
    subtitle: 'LLMs, RAG, agents and evaluation',
    icon: 'bot',
    color: 'rose',
  },
  P: {
    id: 'production-ai',
    subtitle: 'MLOps, reliability and responsible delivery',
    icon: 'rocket',
    color: 'gold',
  },
};

const toSection = (heading: string, body: string, callout?: string): LessonSection => ({
  heading,
  body,
  ...(callout ? { callout } : {}),
});
const toCodeSection = (heading: string, code: string, callout: string): LessonSection => ({
  heading,
  body: 'Read the complete learner-facing example below. Run it locally with the listed dependencies.',
  code,
  callout,
});

const aiCatalog: CatalogPath[] = course.tracks.map((track) => {
  const meta = presentation[track.id];
  const lessons = course.lessons
    .filter((lesson) => lesson.trackId === track.id)
    .map<CatalogLesson>((lesson) => ({
      id: lesson.id,
      pathId: meta.id,
      title: lesson.title,
      description: lesson.concepts,
      durationMinutes: lesson.durationMinutes,
      xp: Math.max(50, Math.round(lesson.durationMinutes / 15) * 10),
      version: 2,
      objectives: lesson.objectives,
      sections: [
        toSection('Concept notes', lesson.concepts),
        toSection('Worked scenario', lesson.workedExample),
        toSection('Practice exercise', lesson.exercise.task, lesson.exercise.acceptanceCriteria),
        toSection('Common mistake', lesson.commonPitfall),
        ...lesson.codeExamples.map((example) =>
          toCodeSection(
            `Code example: ${example.title}.py`,
            example.source,
            `${example.executionMode} example · Dependencies: ${example.dependencies.join(', ') || 'standard library'}.`,
          ),
        ),
        ...(lesson.knowledgeChecks.length
          ? [
              toSection(
                'Knowledge check',
                lesson.knowledgeChecks.map((question) => question.prompt).join('\n\n'),
                'Reflect on these prompts before marking the lesson complete. Model answers remain instructor-only.',
              ),
            ]
          : []),
      ],
      questions: [],
      resources: course.assets
        .filter(
          (asset) =>
            asset.lessonId === lesson.id ||
            asset.moduleId === lesson.moduleId ||
            (asset.kind === 'notebook' && asset.trackId === lesson.trackId),
        )
        .map((asset) => ({
          id: asset.id,
          title: asset.title,
          kind: asset.kind,
          filename: asset.path.split('/').at(-1)!,
          source: asset.source,
        })),
    }));
  return {
    id: meta.id,
    title: track.title,
    subtitle: meta.subtitle,
    description: `${track.title} is a ${track.suggestedWeeks}-week sequence from the AI Engineering v2 curriculum.`,
    icon: meta.icon,
    level: `Track ${track.order} · ${track.suggestedWeeks} weeks`,
    color: meta.color,
    lessons,
  };
});

const externalPresentation: Record<
  string,
  { prefix: string; subtitle: string; icon: string; color: string }
> = {
  [devopsCourse.id]: {
    prefix: 'devops',
    subtitle: 'Infrastructure, secure delivery and production operations',
    icon: 'rocket',
    color: 'blue',
  },
  [dsaCourse.id]: {
    prefix: 'dsa',
    subtitle: 'Patterns, problem solving and interview practice',
    icon: 'chart',
    color: 'violet',
  },
};
function externalCatalog(subject: CurriculumCourse): CatalogPath[] {
  const meta = externalPresentation[subject.id];
  return subject.tracks.map((track) => ({
    id: `${meta.prefix}-${track.id.toLowerCase()}`,
    title: track.title,
    subtitle: meta.subtitle,
    description: `${subject.title}: ${track.title}. Learner materials include lessons, practical labs and reference files.`,
    icon: meta.icon,
    level: `Track ${track.order} · ${track.suggestedWeeks} weeks`,
    color: meta.color,
    lessons: subject.lessons
      .filter((lesson) => lesson.trackId === track.id)
      .map((lesson) => ({
        id: lesson.id,
        pathId: `${meta.prefix}-${track.id.toLowerCase()}`,
        title: lesson.title,
        description: lesson.concepts,
        durationMinutes: lesson.durationMinutes,
        xp: Math.max(50, Math.round(lesson.durationMinutes / 15) * 10),
        version: 1,
        objectives: lesson.objectives,
        sections: [
          toSection('Concept notes', lesson.concepts),
          toSection('Worked scenario', lesson.workedExample),
          toSection('Practice exercise', lesson.exercise.task, lesson.exercise.acceptanceCriteria),
          toSection('Common mistake', lesson.commonPitfall),
        ],
        questions: [],
        resources: subject.assets
          .filter(
            (asset) =>
              asset.lessonId === lesson.id ||
              asset.moduleId === lesson.moduleId ||
              (asset.kind === 'notebook' && asset.trackId === lesson.trackId) ||
              (!asset.moduleId &&
                !asset.lessonId &&
                track.order === 1 &&
                lesson.moduleId === track.moduleIds[0]),
          )
          .map((asset) => ({
            id: asset.id,
            title: asset.title,
            kind: asset.kind,
            filename: asset.path.split('/').at(-1)!,
            source: asset.source,
          })),
      })),
  }));
}
export const catalog: CatalogPath[] = [
  ...aiCatalog,
  ...externalCatalog(devopsCourse),
  ...externalCatalog(dsaCourse),
];

export const allLessons = catalog.flatMap((path) => path.lessons);

export function findLesson(id: string): CatalogLesson | undefined {
  return allLessons.find((lesson) => lesson.id === id);
}

export function findPath(id: string): CatalogPath | undefined {
  return catalog.find((path) => path.id === id);
}

export function publicQuestions(questions: Question[]): LessonQuestion[] {
  return questions.map(
    ({ correctOptionId: _correctOptionId, explanation: _explanation, ...question }) => question,
  );
}
