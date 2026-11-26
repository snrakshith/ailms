import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Lightbulb,
  RotateCcw,
  Sparkles,
  Target,
  ThumbsUp,
} from 'lucide-react';
import type { SubmissionResult } from '@sapling/contracts';
import { useLearningLesson, useSubmitLesson } from '../api/learning';
import { GradientDescentLab } from '../components/gradient-lab';
import { TutorHints } from '../../experience/components/tutor-hints';
import { Loading } from '../../../shared/components/ui/loading';
import { useDocumentTitle } from '../../../shared/hooks/use-document-title';
function LessonScreen({ lessonId }: { lessonId: string }) {
  const { data, isPending, error } = useLearningLesson(lessonId);
  const submission = useSubmitLesson(lessonId);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<SubmissionResult | null>(null);
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
                <pre className="aq-code">
                  <code>{section.code}</code>
                </pre>
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
          <section className="aq-quiz" aria-labelledby="quiz-title">
            <span className="aq-kicker">PUT KNOWLEDGE TO WORK</span>
            <h2 id="quiz-title">Knowledge check</h2>
            <p>
              Choose the best answer for each scenario. Answer at least 65% correctly to pass. You
              can retry without penalty.
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
                    {result.correctCount}/{result.totalQuestions} correct · {result.scorePercent}%
                    score.{' '}
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
                  {answered}/{lesson.questions.length} answered
                </span>
                <button
                  className="aq-primary"
                  disabled={answered < lesson.questions.length || submission.isPending}
                  onClick={submit}
                >
                  {submission.isPending ? 'Checking your answers…' : 'Check answers'}{' '}
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
    </div>
  );
}
export function LessonPage() {
  const { lessonId = '' } = useParams();
  return <LessonScreen key={lessonId} lessonId={lessonId} />;
}
