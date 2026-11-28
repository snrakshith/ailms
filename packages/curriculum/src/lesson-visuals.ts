import type { CourseAsset, CourseLesson, CurriculumCourse } from './index.js';

const palettes = [
  ['#0f766e', '#ccfbf1'],
  ['#4338ca', '#e0e7ff'],
  ['#b45309', '#fef3c7'],
  ['#be185d', '#fce7f3'],
];

const escapeXml = (value: string) =>
  value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&apos;',
        '"': '&quot;',
      })[character]!,
  );

const concise = (value: string, length = 76) =>
  value
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, length)
    .replace(/[,:;]$/, '');

function mermaidFor(lesson: CourseLesson) {
  const objective = concise(lesson.objectives[0] ?? lesson.concepts, 54);
  return [
    'flowchart LR',
    `  A[${lesson.title.replace(/[\[\]]/g, '')}] --> B[${objective.replace(/[\[\]]/g, '')}]`,
    '  B --> C[Practice and reflect]',
  ].join('\n');
}

function svgFor(lesson: CourseLesson, index: number) {
  const [ink, wash] = palettes[index % palettes.length];
  const title = escapeXml(concise(lesson.title, 62));
  const objective = escapeXml(concise(lesson.objectives[0] ?? lesson.concepts, 74));
  const practice = escapeXml(concise(lesson.exercise.task, 74));
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="560" viewBox="0 0 1200 560" role="img" aria-labelledby="title desc"><title id="title">${title}</title><desc id="desc">A concept map for ${title}. It connects the core idea to a learning objective and practice activity.</desc><rect width="1200" height="560" fill="#ffffff"/><rect x="36" y="36" width="1128" height="488" rx="28" fill="${wash}"/><text x="84" y="118" fill="${ink}" font-family="system-ui, sans-serif" font-size="24" font-weight="700" letter-spacing="2">CONCEPT MAP</text><text x="84" y="182" fill="#102a43" font-family="system-ui, sans-serif" font-size="42" font-weight="700">${title}</text><path d="M284 310H432M768 310H916" stroke="${ink}" stroke-width="8" stroke-linecap="round"/><path d="M416 292l28 18-28 18M900 292l28 18-28 18" fill="none" stroke="${ink}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><g font-family="system-ui, sans-serif"><rect x="84" y="252" width="200" height="116" rx="20" fill="#ffffff"/><text x="108" y="292" fill="${ink}" font-size="16" font-weight="700">CORE IDEA</text><text x="108" y="326" fill="#102a43" font-size="18">Understand</text><rect x="432" y="252" width="336" height="116" rx="20" fill="#ffffff"/><text x="456" y="292" fill="${ink}" font-size="16" font-weight="700">LEARNING OBJECTIVE</text><text x="456" y="326" fill="#102a43" font-size="18">${objective}</text><rect x="916" y="252" width="200" height="116" rx="20" fill="#ffffff"/><text x="940" y="292" fill="${ink}" font-size="16" font-weight="700">APPLY</text><text x="940" y="326" fill="#102a43" font-size="18">Practice</text><text x="84" y="438" fill="#334e68" font-size="18">${practice}</text></g></svg>`;
}

export function lessonVisualAssets(subject: CurriculumCourse): CourseAsset[] {
  return subject.lessons.map((lesson, index) => ({
    id: `visual:${subject.id}:${lesson.id}`,
    title: `${lesson.title} concept map`,
    kind: 'diagram',
    path: `generated/diagrams/${lesson.id}.svg`,
    trackId: lesson.trackId,
    moduleId: lesson.moduleId,
    lessonId: lesson.id,
    altText: `Concept map for ${lesson.title}: understand the core idea, ${concise(lesson.objectives[0] ?? lesson.concepts, 96)}, then apply it in practice.`,
    caption: `Use this concept map to connect ${lesson.title} with its learning objective and hands-on practice.`,
    primaryVisual: true,
    mermaidSource: mermaidFor(lesson),
    source: svgFor(lesson, index),
  }));
}
