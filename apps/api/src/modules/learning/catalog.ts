import { course } from '@aiquest/curriculum';
import type { LessonQuestion, LessonSection } from '@sapling/contracts';

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

export const catalog: CatalogPath[] = course.tracks.map((track) => {
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
