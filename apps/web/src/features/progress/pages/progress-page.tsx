import { Link } from 'react-router-dom';
import { Award, CheckCircle2, Clock3, Flame, Medal, MoveUpRight, Zap } from 'lucide-react';
import { useLearningOverview } from '../../learning/api/learning';
import { Loading } from '../../../shared/components/ui/loading';
import { useDocumentTitle } from '../../../shared/hooks/use-document-title';
export function ProgressPage() {
  const { data, isPending, error } = useLearningOverview();
  useDocumentTitle('Learning progress');
  if (isPending) return <Loading />;
  if (!data || error)
    return (
      <div className="aq-page">
        <p className="aq-error" role="alert">
          {error?.message ?? 'Unable to load progress'}
        </p>
      </div>
    );
  return (
    <div className="aq-page">
      <header className="aq-page-heading">
        <span className="aq-kicker">PROOF OF PROGRESS</span>
        <h1>Every small win counts.</h1>
        <p>
          Real understanding is built one lesson at a time. Your mastery is based on passing
          assessments, not just clicking Next.
        </p>
      </header>
      <div className="aq-stat-grid">
        <div className="aq-stat">
          <div className="aq-stat-label">
            XP earned <Zap size={17} />
          </div>
          <strong>{data.stats.totalXp}</strong>
        </div>
        <div className="aq-stat">
          <div className="aq-stat-label">
            Lessons mastered <CheckCircle2 size={17} />
          </div>
          <strong>{data.stats.completedLessons}</strong>
        </div>
        <div className="aq-stat">
          <div className="aq-stat-label">
            Streak <Flame size={17} />
          </div>
          <strong>
            {data.stats.streakDays}
            <small> days</small>
          </strong>
        </div>
        <div className="aq-stat">
          <div className="aq-stat-label">
            Estimated effort <Clock3 size={17} />
          </div>
          <strong>
            {data.stats.timeInvestedMinutes}
            <small> min</small>
          </strong>
        </div>
      </div>
      <section className="aq-panel aq-progress-section">
        <div className="aq-section-heading">
          <div>
            <span className="aq-kicker">PATH MASTERY</span>
            <h2>Your skill map</h2>
          </div>
          <Medal size={23} />
        </div>
        {data.paths.map((path) => (
          <div key={path.id} className="aq-mastery-row">
            <span>
              <strong>{path.title}</strong>
              <small>
                {path.completedLessons} of {path.lessonCount} lessons
              </small>
            </span>
            <div className="aq-progress-track">
              <progress
                value={path.progressPercent}
                max="100"
                aria-label={`${path.title} progress`}
              />
            </div>
            <strong>{path.progressPercent}%</strong>
            <Link to={`/paths/${path.id}`} aria-label={`Explore ${path.title}`}>
              <MoveUpRight size={18} />
            </Link>
          </div>
        ))}
      </section>
      <section className="aq-panel aq-badges">
        <div className="aq-section-heading">
          <div>
            <span className="aq-kicker">EARNED THROUGH MASTERY</span>
            <h2>Completed tracks</h2>
          </div>
          <Award size={22} />
        </div>
        {data.stats.masteredSkills.length ? (
          <ul>
            {data.stats.masteredSkills.map((skill) => (
              <li key={skill}>
                <Award size={21} />
                <span>{skill} specialist</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            Finish all the lessons in any path to earn a mastery badge. Your first one is closer
            than you think.
          </p>
        )}
      </section>
    </div>
  );
}
