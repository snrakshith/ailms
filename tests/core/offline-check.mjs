/** Dependency-light checks for portable learning rules. Requires the TypeScript compiler. */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdtemp, readFile, writeFile, readdir, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const require = createRequire(import.meta.url);
let ts;
try {
  ts = require('typescript');
} catch {
  throw new Error('TypeScript not available. Run npm install or set NODE_PATH to global modules.');
}
const dir = await mkdtemp(path.join(os.tmpdir(), 'aiquest-core-'));
const source = 'packages/learning-core/src';
let count = 0;
const checkSyntax = async (base) => {
  for (const entry of await readdir(base, { withFileTypes: true })) {
    const item = path.join(base, entry.name);
    if (entry.isDirectory()) {
      await checkSyntax(item);
      continue;
    }
    if (!/\.(ts|tsx)$/.test(item) || item.endsWith('.d.ts')) continue;
    const code = await readFile(item, 'utf8');
    const result = ts.transpileModule(code, {
      fileName: item,
      reportDiagnostics: true,
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
        jsx: ts.JsxEmit.ReactJSX,
      },
    });
    const errors = (result.diagnostics ?? []).filter(
      (d) => d.category === ts.DiagnosticCategory.Error,
    );
    assert.equal(
      errors.length,
      0,
      `${item}: ${errors.map((e) => ts.flattenDiagnosticMessageText(e.messageText, ' ')).join('; ')}`,
    );
    count++;
  }
};
try {
  await checkSyntax('packages');
  await checkSyntax('apps');
  await writeFile(path.join(dir, 'package.json'), ' {"type":"module"} ');
  const sources = {
    'catalog.ts': 'apps/api/src/modules/learning/catalog.ts',
    'learning.logic.ts': 'apps/api/src/modules/learning/learning.logic.ts',
    'algorithms.ts': 'packages/learning-core/src/algorithms.ts',
    'rules.ts': 'packages/learning-core/src/rules.ts',
  };
  for (const [file, location] of Object.entries(sources)) {
    let code = await readFile(location, 'utf8');
    if (file === 'catalog.ts') {
      const curriculumUrl = pathToFileURL(path.resolve('packages/curriculum/dist/index.js')).href;
      code = code.replace("from '@aiquest/curriculum'", `from '${curriculumUrl}'`);
    }
    if (file === 'learning.logic.ts')
      code = code.replace("from '@aiquest/learning-core'", "from './rules.js'");
    const js = ts.transpileModule(code, {
      fileName: file,
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    await writeFile(path.join(dir, file.replace('.ts', '.js')), js);
  }
  const core = await import(pathToFileURL(path.join(dir, 'algorithms.js')).href);
  const catalog = await import(pathToFileURL(path.join(dir, 'catalog.js')).href);
  const learning = await import(pathToFileURL(path.join(dir, 'learning.logic.js')).href);
  const rules = await import(pathToFileURL(path.join(dir, 'rules.js')).href);
  assert.equal(
    rules.gradeAnswers([{ id: 'x', correctOptionId: 'b', explanation: 'OK' }], { x: 'b' }).passed,
    true,
  );
  assert.equal(rules.lessonUnlocked(['a', 'b'], 'b', new Set()), false);
  assert.equal(core.cosineSimilarity([1, 0], [1, 0]), 1);
  assert.equal(core.cosineSimilarity([1, 0], [0, 1]), 0);
  assert.throws(() => core.cosineSimilarity([1], [1, 2]));
  assert.equal(core.compareTexts('orange apple', 'orange apple').similarity, 1);
  assert.equal(core.compareTexts('orange', 'zebra').similarity, 0);
  assert.equal(core.compareTexts('', '').similarity, 0);
  assert.equal(
    core.bestSectionIndex(
      [
        { heading: 'Tokens', body: 'words' },
        { heading: 'Gradient descent', body: 'optimizer learning rate' },
      ],
      'Why does learning rate change?',
    ),
    1,
  );
  assert.deepEqual(core.tokenize('LLMs, RAG!'), ['llms', 'rag']);
  assert.deepEqual(core.gradientSteps(0.5, 3), [3, 0, 0, 0]);
  assert.throws(() => core.gradientSteps(-1, 4));
  const confusion = core.confusionMatrix([true, true, false, false], [true, false, true, false]);
  assert.deepEqual([confusion.tp, confusion.fn, confusion.fp, confusion.tn], [1, 1, 1, 1]);
  assert.equal(confusion.accuracy, 0.5);
  const first = core.planReview(null, 'good', new Date('2026-11-23T00:00:00.000Z'));
  assert.equal(first.intervalDays, 1);
  const second = core.planReview(first, 'good', new Date('2026-11-24T00:00:00.000Z'));
  assert.equal(second.intervalDays, 6);
  assert.equal(
    core.planReview(second, 'again', new Date('2026-11-25T00:00:00.000Z')).repetitions,
    0,
  );
  assert.equal(
    core.recommendNextLesson(
      [
        {
          lessonId: 'a',
          completed: true,
          scorePercent: 50,
          dueAt: '2026-11-22T00:00:00.000Z',
          attempts: 1,
        },
        { lessonId: 'b', completed: false, scorePercent: 0, attempts: 0 },
      ],
      new Date('2026-11-23T00:00:00.000Z'),
    ),
    'a',
  );
  const paths = catalog.catalog;
  assert.equal(paths.length, 16);
  assert.equal(paths.flatMap((p) => p.lessons).length, 217);
  const firstLesson = paths[0].lessons[0];
  const answers = Object.fromEntries(firstLesson.questions.map((q) => [q.id, q.correctOptionId]));
  assert.equal(learning.gradeLesson(firstLesson, answers).passed, true);
  assert.equal(
    learning.gradeLesson(firstLesson, {}).passed,
    firstLesson.questions.length === 0,
    'Reflective lessons without graded questions should be completable; graded lessons require answers',
  );
  assert.equal(learning.isUnlocked(paths[0].lessons[0], new Set()), true);
  assert.equal(learning.isUnlocked(paths[0].lessons[1], new Set()), false);
  assert.equal(learning.isUnlocked(paths[0].lessons[1], new Set([firstLesson.id])), true);
  const presented = core.presentQuestions(catalog.publicQuestions(firstLesson.questions), 'user1');
  assert.deepEqual(
    presented,
    core.presentQuestions(catalog.publicQuestions(firstLesson.questions), 'user1'),
  );
  assert.deepEqual(
    presented.map((q) => q.id).sort(),
    firstLesson.questions.map((q) => q.id).sort(),
  );
  assert.equal(
    catalog.publicQuestions(firstLesson.questions).some((q) => 'correctOptionId' in q),
    false,
  );
  const completed = learning.formatPaths(new Set([firstLesson.id]));
  assert.equal(completed[0].completedLessons, 1);
  const sdkSource = await readFile('packages/client-sdk/src/index.ts', 'utf8');
  await writeFile(
    path.join(dir, 'sdk.js'),
    ts.transpileModule(sdkSource, {
      fileName: 'index.ts',
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    }).outputText,
  );
  const { createAiQuestClient } = await import(pathToFileURL(path.join(dir, 'sdk.js')).href);
  const received = [];
  const client = createAiQuestClient({
    request: async (path, body) => {
      received.push([path, body]);
      return { data: {} };
    },
  });
  await client.paths();
  await client.submit('lesson/with spaces', { answers: { q1: 'a' }, idempotencyKey: 'id' });
  assert.equal(received[0][0], '/learning/paths');
  assert.equal(received[1][0], '/learning/lessons/lesson%2Fwith%20spaces/submit');
  assert.equal(
    (await readdir('packages/learning-core/src')).includes('catalog.ts'),
    false,
    'Answer keys must not ship in portable package',
  );
  console.log(
    `PASS: ${count} TypeScript/TSX source files parsed; portable rules, grading, sequencing, SDK and lab math checks passed.`,
  );
} finally {
  await rm(dir, { recursive: true, force: true });
}
