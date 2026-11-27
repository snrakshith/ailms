import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Code2,
  Download,
  FileText,
  Filter,
  FlaskConical,
  FolderKanban,
  Layers3,
  PlaySquare,
  Route,
  Search,
  StickyNote,
} from 'lucide-react';
import { useLearningResources } from '../api/learning';
import { Loading } from '../../../shared/components/ui/loading';
import { useDocumentTitle } from '../../../shared/hooks/use-document-title';

const labels: Record<string, { label: string; Icon: typeof BookOpen }> = {
  code: { label: 'Code', Icon: Code2 },
  notebook: { label: 'Notebooks', Icon: BookOpen },
  reading: { label: 'Reading', Icon: FileText },
  diagram: { label: 'Diagrams', Icon: Layers3 },
  visualization: { label: 'Interactive', Icon: PlaySquare },
  lab: { label: 'Labs', Icon: FlaskConical },
  flashcards: { label: 'Flashcards', Icon: StickyNote },
  dataset: { label: 'Datasets', Icon: FolderKanban },
  pathway: { label: 'Pathways', Icon: Route },
  capstone: { label: 'Capstones', Icon: FolderKanban },
  other: { label: 'Reference', Icon: FileText },
};
export function ResourceLibraryPage() {
  useDocumentTitle('Curriculum library');
  const { data, isPending, error } = useLearningResources();
  const [kind, setKind] = useState('all');
  const [query, setQuery] = useState('');
  const rows = useMemo(
    () =>
      data?.data.filter(
        (item) =>
          (kind === 'all' || item.kind === kind) &&
          `${item.title} ${item.filename} ${item.pathId}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ) ?? [],
    [data, kind, query],
  );
  if (isPending) return <Loading />;
  if (error)
    return (
      <div className="aq-page">
        <p role="alert" className="aq-error">
          {error.message}
        </p>
      </div>
    );
  const kinds = ['all', ...Array.from(new Set(data?.data.map((item) => item.kind) ?? []))];
  return (
    <div className="aq-page aq-library">
      <span className="aq-kicker">CANONICAL CURRICULUM</span>
      <h1>Resource library</h1>
      <p>
        Browse every learner-facing file in the course. Files stay connected to their track and
        source lesson.
      </p>
      <div className="aq-library-toolbar">
        <label>
          <Search size={16} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search files and topics"
          />
        </label>
        <span>
          <Filter size={15} /> {rows.length} resources
        </span>
      </div>
      <div className="aq-tab-row" role="group" aria-label="Resource type">
        {kinds.map((value) => {
          const item = value === 'all' ? { label: 'All', Icon: BookOpen } : labels[value];
          const Icon = item.Icon;
          return (
            <button
              key={value}
              className={`aq-outline ${kind === value ? 'aq-tab-active' : ''}`}
              onClick={() => setKind(value)}
            >
              <Icon size={15} />
              {item.label}
            </button>
          );
        })}
      </div>
      <div className="aq-library-grid">
        {rows.map((item) => {
          const meta = labels[item.kind] ?? labels.other;
          const Icon = meta.Icon;
          return (
            <article key={item.id} className="aq-library-card">
              <div className="aq-library-card-icon">
                <Icon size={20} />
              </div>
              <span className="aq-pill">{meta.label}</span>
              <h2>{item.title}</h2>
              <p>
                {item.pathId.replaceAll('-', ' ')}
                {item.moduleId ? ` · ${item.moduleId}` : ''}
              </p>
              {item.kind === 'visualization' ? (
                <a
                  className="aq-primary"
                  href={`/api/v1/learning/resources/${encodeURIComponent(item.id)}/view`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <PlaySquare size={16} /> Open interactive
                </a>
              ) : item.kind === 'flashcards' ? (
                <Link className="aq-primary" to="/flashcards">
                  <StickyNote size={16} /> Study cards
                </Link>
              ) : item.kind === 'diagram' ? (
                <a
                  className="aq-primary"
                  href={`/api/v1/learning/resources/${encodeURIComponent(item.id)}/view`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <PlaySquare size={16} /> View diagram
                </a>
              ) : (
                <a
                  className="aq-outline"
                  href={`/api/v1/learning/resources/${encodeURIComponent(item.id)}`}
                >
                  <Download size={16} /> Download {item.filename}
                </a>
              )}
            </article>
          );
        })}
      </div>
      {!rows.length && <p className="aq-muted">No resources match this filter.</p>}
    </div>
  );
}
