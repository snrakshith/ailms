import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  ChartNoAxesCombined,
  Clock3,
  Eye,
  Rocket,
  Sparkles,
} from 'lucide-react';
import type { LearningPath } from '@sapling/contracts';
export function PathSymbol({ icon }: { icon: string }) {
  if (icon === 'bot') return <BrainCircuit size={23} />;
  if (icon === 'brain') return <BrainCircuit size={23} />;
  if (icon === 'chart') return <ChartNoAxesCombined size={23} />;
  if (icon === 'eye') return <Eye size={23} />;
  if (icon === 'rocket') return <Rocket size={23} />;
  return <Sparkles size={23} />;
}
export function PathCard({ path }: { path: LearningPath }) {
  return (
    <Link to={`/paths/${path.id}`} className={`aq-path-card aq-accent-${path.color}`}>
      <div className="aq-path-icon">
        <PathSymbol icon={path.icon} />
      </div>
      <div className="aq-card-top">
        <span className="aq-pill">
          {path.requiresPurchase && !path.purchaseUnlocked ? 'Learning pass' : path.level}
        </span>
        <ArrowUpRight size={17} />
      </div>
      <h3>{path.title}</h3>
      <p className="aq-path-subtitle">{path.subtitle}</p>
      <p className="aq-card-description">{path.description}</p>
      <div className="aq-progress-track">
        <progress value={path.progressPercent} max="100" aria-label={`${path.title} progress`} />
      </div>
      <div className="aq-path-footer">
        <span>
          <BookOpen size={14} /> {path.completedLessons}/{path.lessonCount} lessons
        </span>
        <span>
          <Clock3 size={14} /> {path.estimatedMinutes} min
        </span>
      </div>
    </Link>
  );
}
