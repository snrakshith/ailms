import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Check,
  Code2,
  Copy,
  Clock3,
  Download,
  Eye,
  FileText,
  Lightbulb,
  RotateCcw,
  Sparkles,
  Target,
  ThumbsUp,
  X,
} from 'lucide-react';
import type { SubmissionResult } from '@sapling/contracts';
import { useLearningLesson, useSubmitLesson } from '../api/learning';
import { GradientDescentLab } from '../components/gradient-lab';
import { TutorHints } from '../../experience/components/tutor-hints';
import { Loading } from '../../../shared/components/ui/loading';
import { useDocumentTitle } from '../../../shared/hooks/use-document-title';

type NotebookCell = { cell_type?: string; source?: string[] | string };
function sourceText(source: NotebookCell['source']) {
  return Array.isArray(source) ? source.join('') : (source ?? '');
}
function CodeEditor({ code, filename = 'example.py' }: { code: string; filename?: string }) {
  const [copied, setCopied] = useState(false);
  const lines = code.replace(/\n$/, '').split('\n');
  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div className="aq-code-editor">
      <header>
        <span>
          <Code2 size={15} />
          {filename}
        </span>
        <button type="button" onClick={() => void copy()}>
          {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
        </button>
      </header>
      <pre>
        <code>
          {lines.map((line, index) => (
            <span key={`${index}-${line}`}>
              <i>{index + 1}</i>
              {line || ' '}
              {'\n'}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
function NotebookPreview({
  resource,
  onClose,
}: {
  resource: { id: string; title: string };
  onClose: () => void;
}) {
  const [cells, setCells] = useState<NotebookCell[] | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    void fetch(`/api/v1/learning/resources/${resource.id}`)
      .then(async (response) => {
        if (!response.ok) throw new Error('Unable to load notebook');
        const notebook = (await response.json()) as { cells?: NotebookCell[] };
        setCells(notebook.cells ?? []);
      })
      .catch((reason) =>
        setError(reason instanceof Error ? reason.message : 'Unable to load notebook'),
      );
  }, [resource.id]);
  return (
    <div className="aq-notebook-backdrop" role="presentation">
      <section
        className="aq-notebook-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="notebook-title"
      >
        <header>
          <div>
            <span className="aq-kicker">READ-ONLY NOTEBOOK</span>
            <h2 id="notebook-title">{resource.title}</h2>
          </div>
          <button type="button" aria-label="Close notebook preview" onClick={onClose}>
            <X size={19} />
          </button>
        </header>
        {error && (
          <p role="alert" className="aq-error">
            {error}
          </p>
        )}
        {!cells && !error && <p className="aq-muted">Loading notebook cells…</p>}
        {cells?.map((cell, index) =>
          cell.cell_type === 'code' ? (
            <CodeEditor key={index} code={sourceText(cell.source)} filename={`Cell ${index + 1}`} />
          ) : (
            <section key={index} className="aq-notebook-markdown">
              {sourceText(cell.source)}
            </section>
          ),
        )}
      </section>
    </div>
  );
}
function LessonScreen({ lessonId }: { lessonId: string }) {
  const { data, isPending, error } = useLearningLesson(lessonId);
  const submission = useSubmitLesson(lessonId);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [notebook, setNotebook] = useState<{ id: string; title: string } | null>(null);
  useDocumentTitle(data?.data.title ?? 'Lesson');
  const lesson = data?.data;
  const answered = useMemo(
    () => lesson?.questions.filter((q) => Boolean(answers[q.id])).length ?? 0,
    [answers, lesson],
  );
  if (isPending) return <Loading />;
  if (error || !lesson)
    return (
      <div className="aq-page">
        <p role="alert" className="aq-error">
          {error?.message ?? 'Lesson unavailable'}
        </p>
        <Link to="/paths">Browse learning paths</Link> ·{' '}
        <Link to="/billing">View learning pass</Link>
      </div>
    );
  const submit = async () => {
    try {
      const response = await submission.mutateAsync({
        answers,
        idempotencyKey: crypto.randomUUID(),
      });
      setResult(response.data);
    } catch {
      /* error is presented below */
    }
  };
  const feedbackFor = (id: string) => result?.feedback.find((item) => item.questionId === id);
  return (
    <div className="aq-page aq-lesson-page">
      <Link className="aq-back" to={`/paths/${lesson.pathId}`}>
        <ArrowLeft size={16} /> {lesson.pathTitle}
      </Link>
      <div className="aq-lesson-heading">
        <div>
          <span className="aq-kicker">THE LEARNING LAB · {lesson.pathTitle.toUpperCase()}</span>
          <h1>{lesson.title}</h1>
          <p>{lesson.description}</p>
          <div className="aq-hero-meta">
            <span>
              <Clock3 size={15} />
              {lesson.durationMinutes} min read & practice
            </span>
            <span>
              <Sparkles size={15} /> +{lesson.xp} XP on first pass
            </span>
          </div>
        </div>
        <span className="aq-pill">Lesson v{lesson.version}</span>
      </div>
      <div className="aq-learning-layout">
        <div className="aq-reading-column">
          <section className="aq-objectives">
            <div className="aq-section-label">
              <Target size={18} /> WHAT YOU'LL LEARN
            </div>
            <ul>
              {lesson.objectives.map((objective) => (
                <li key={objective}>
                  <CheckCircle2 size={16} />
                  {objective}
                </li>
              ))}
            </ul>
          </section>
          {lesson.sections.map((section, index) => (
            <section key={index} className="aq-reading-section">
              <span className="aq-step-number">0{index + 1}</span>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
              {section.code && (
                <CodeEditor
                  code={section.code}
                  filename={section.heading
                    .replace('Code example: ', '')
                    .replace(/\s+/g, '-')
                    .toLowerCase()}
                />
              )}
              {section.callout && (
                <div className="aq-tip">
                  <Lightbulb size={20} />
                  <span>{section.callout}</span>
                </div>
              )}
            </section>
          ))}
          {lesson.id === 'gradient-descent' && <GradientDescentLab />}
          {lesson.resources.length > 0 && (
            <section className="aq-resource-section" aria-labelledby="resource-title">
              <span className="aq-kicker">COURSE FILES</span>
              <h2 id="resource-title">Code and offline notebooks</h2>
              <p>Download the exact learner-facing files bundled with this curriculum.</p>
              <div className="aq-resource-list">
                {lesson.resources.map((resource) => (
                  <div key={resource.id} className="aq-resource-link">
                    <span>
                      <strong>
                        {resource.kind === 'notebook'
                          ? 'Jupyter notebook'
                          : resource.kind === 'code'
                            ? 'Code example'
                            : resource.kind === 'lab'
                              ? 'Lab guide or starter'
                              : resource.kind === 'diagram'
                                ? 'Architecture diagram'
                                : resource.kind === 'visualization'
                                  ? 'Interactive visualization'
                                  : resource.kind === 'reading'
                                    ? 'Course reading'
                                    : 'Course resource'}
                      </strong>
                      <small>{resource.title}</small>
                    </span>
                    <span className="aq-resource-actions">
                      {resource.kind === 'notebook' && (
                        <button type="button" onClick={() => setNotebook(resource)}>
                          <Eye size={16} /> Preview
                        </button>
                      )}
                      {(resource.kind === 'diagram' || resource.kind === 'visualization') && (
                        <a
                          href={`/api/v1/learning/resources/${resource.id}/view`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Eye size={16} /> View
                        </a>
                      )}
                      <a href={`/api/v1/learning/resources/${resource.id}`}>
                        {resource.kind === 'reading' ? (
                          <FileText size={17} />
                        ) : (
                          <Download size={17} />
                        )}{' '}
                        Download
                      </a>
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
          <section className="aq-quiz" aria-labelledby="quiz-title">
            <span className="aq-kicker">PUT KNOWLEDGE TO WORK</span>
            <h2 id="quiz-title">Knowledge check</h2>
            <p>
              {lesson.questions.length
                ? 'Choose the best answer for each scenario. Answer at least 65% correctly to pass. You can retry without penalty.'
                : 'Use the reflective prompts in the lesson, complete the practice exercise, then record your completion.'}
            </p>
            {lesson.questions.map((q, index) => {
              const feedback = feedbackFor(q.id);
              return (
                <fieldset
                  className="aq-question"
                  data-question-id={q.id}
                  key={q.id}
                  disabled={Boolean(result)}
                >
                  <legend>
                    <span>
                      QUESTION {index + 1} OF {lesson.questions.length}
                    </span>
                    {q.prompt}
                  </legend>
                  <div className="aq-options">
                    {q.options.map((option) => (
                      <label
                        key={option.id}
                        data-option-id={option.id}
                        className={`aq-option ${answers[q.id] === option.id ? 'aq-selected' : ''} ${feedback && option.id === feedback.correctOptionId ? 'aq-correct' : ''} ${feedback && !feedback.correct && answers[q.id] === option.id ? 'aq-wrong' : ''}`}
                      >
                        <input
                          type="radio"
                          name={`${lesson.id}-${q.id}`}
                          checked={answers[q.id] === option.id}
                          onChange={() => setAnswers((v) => ({ ...v, [q.id]: option.id }))}
                        />
                        <span className="aq-letter">{option.id.toUpperCase()}</span>
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {feedback && (
                    <p
                      className={`aq-feedback ${feedback.correct ? 'aq-success-text' : 'aq-error-text'}`}
                    >
                      <strong>{feedback.correct ? 'Correct. ' : 'Not quite. '}</strong>
                      {feedback.explanation}
                    </p>
                  )}
                </fieldset>
              );
            })}
            {submission.isError && (
              <p role="alert" className="aq-error">
                {submission.error.message}
              </p>
            )}
            {result ? (
              <div className={`aq-result ${result.passed ? 'aq-result-pass' : 'aq-result-retry'}`}>
                <div className="aq-result-icon">
                  {result.passed ? <ThumbsUp size={25} /> : <RotateCcw size={24} />}
                </div>
                <div>
                  <h3>
                    {result.passed ? 'Nice work — lesson mastered!' : 'Almost there. Keep going.'}
                  </h3>
                  <p>
                    {result.totalQuestions
                      ? `${result.correctCount}/${result.totalQuestions} correct · ${result.scorePercent}% score. `
                      : 'Practice reflection recorded. '}
                    {result.passed
                      ? result.awardedXp > 0
                        ? `You earned ${result.awardedXp} XP!`
                        : 'Mastery preserved — XP is awarded once per lesson.'
                      : 'Review the explanations and try again.'}
                  </p>
                  <div className="aq-result-actions">
                    {!result.passed && (
                      <button
                        className="aq-outline"
                        onClick={() => {
                          setResult(null);
                          submission.reset();
                        }}
                      >
                        Try again <RotateCcw size={16} />
                      </button>
                    )}
                    {result.passed && lesson.nextLessonId && (
                      <Link className="aq-primary" to={`/learn/${lesson.nextLessonId}`}>
                        Next lesson <ArrowRight size={16} />
                      </Link>
                    )}
                    <Link className="aq-outline" to={`/paths/${lesson.pathId}`}>
                      Back to path
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="aq-submit-row">
                <span className="aq-muted">
                  {lesson.questions.length
                    ? `${answered}/${lesson.questions.length} answered`
                    : 'Ready to complete'}
                </span>
                <button
                  className="aq-primary"
                  disabled={answered < lesson.questions.length || submission.isPending}
                  onClick={submit}
                >
                  {submission.isPending
                    ? 'Saving completion…'
                    : lesson.questions.length
                      ? 'Check answers'
                      : 'Complete lesson'}{' '}
                  <ArrowRight size={17} />
                </button>
              </div>
            )}
          </section>
        </div>
        <aside className="aq-study-aside">
          <TutorHints lessonId={lesson.id} />
          <div className="aq-side-panel">
            <div className="aq-side-icon">
              <Lightbulb size={19} />
            </div>
            <h3>Learn by reasoning</h3>
            <p>
              You don’t need to memorize buzzwords. Connect each concept to the programs, tests and
              APIs you already understand.
            </p>
          </div>
          <div className="aq-side-panel">
            <span className="aq-kicker">YOUR MOMENTUM</span>
            <h3>
              {result?.passed
                ? 'Lesson complete 🎉'
                : lesson.completed
                  ? 'Already completed'
                  : 'Keep building'}
            </h3>
            <p>
              {lesson.completed || result?.passed
                ? 'You can revisit this lesson whenever you need a refresher.'
                : 'Take your time. Your score won’t be penalized for mistakes.'}
            </p>
          </div>
        </aside>
      </div>
      {notebook && <NotebookPreview resource={notebook} onClose={() => setNotebook(null)} />}
    </div>
  );
}
export function LessonPage() {
  const { lessonId = '' } = useParams();
  return <LessonScreen key={lessonId} lessonId={lessonId} />;
}
