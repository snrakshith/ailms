import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { ProjectInput } from '@sapling/contracts';
import { api } from '../../../core/api/client';
import { useDocumentTitle } from '../../../shared/hooks/use-document-title';
import { Link, Share2, FolderGit2, CheckCircle2 } from 'lucide-react';
type Project = ProjectInput & {
  id: string;
  slug: string;
  status: 'draft' | 'submitted' | 'published';
  publishedAt?: string;
};
const initial: ProjectInput = {
  title: '',
  summary: '',
  repositoryUrl: '',
  demoUrl: '',
  track: 'genai-engineering',
  skills: ['React', 'Node.js'],
  reflection: '',
};
export function PortfolioPage() {
  useDocumentTitle('AI capstones');
  const cache = useQueryClient();
  const [values, setValues] = useState<ProjectInput>(initial);
  const [editing, setEditing] = useState<string | null>(null);
  const [notice, setNotice] = useState('');
  const projects = useQuery({
    queryKey: ['portfolio'],
    queryFn: () => api<{ data: Project[] }>('/portfolio/projects'),
  });
  const refresh = () => {
    void cache.invalidateQueries({ queryKey: ['portfolio'] });
    setNotice('Portfolio updated.');
  };
  const save = useMutation({
    mutationFn: () =>
      api<{ data: Project }>(editing ? `/portfolio/projects/${editing}` : '/portfolio/projects', {
        method: editing ? 'PUT' : 'POST',
        body: JSON.stringify(values),
      }),
    onSuccess: () => {
      refresh();
      setValues(initial);
      setEditing(null);
    },
  });
  const action = useMutation({
    mutationFn: ({ id, verb }: { id: string; verb: string }) =>
      api(`/portfolio/projects/${id}/${verb}`, { method: 'POST' }),
    onSuccess: refresh,
  });
  const remove = useMutation({
    mutationFn: (id: string) => api(`/portfolio/projects/${id}`, { method: 'DELETE' }),
    onSuccess: refresh,
  });
  const set = (key: keyof ProjectInput, value: ProjectInput[typeof key]) =>
    setValues((v) => ({ ...v, [key]: value }));
  const startEdit = (item: Project) => {
    setValues({
      title: item.title,
      summary: item.summary,
      repositoryUrl: item.repositoryUrl ?? '',
      demoUrl: item.demoUrl ?? '',
      track: item.track,
      skills: item.skills,
      reflection: item.reflection,
    });
    setEditing(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="aq-page aq-experience">
      <span className="aq-kicker">P1 · BUILD & DEMONSTRATE</span>
      <h1>AI project portfolio</h1>
      <p>
        Show what you can build—not just what you watched. Draft your capstone, submit it for your
        own review, then optionally publish a public showcase.
      </p>
      <section className="aq-exp-card">
        <h2>
          <FolderGit2 size={21} />
          {editing ? 'Edit capstone' : 'Create a capstone'}
        </h2>
        <div className="aq-form-2">
          <label className="aq-field">
            Project title
            <input
              value={values.title}
              maxLength={130}
              onChange={(e) => set('title', e.target.value)}
              placeholder="Production-ready document assistant"
            />
          </label>
          <label className="aq-field">
            Learning track
            <select
              value={values.track}
              onChange={(e) => set('track', e.target.value as ProjectInput['track'])}
            >
              <option value="ai-foundations">AI Foundations</option>
              <option value="machine-learning">Machine Learning</option>
              <option value="genai-engineering">Generative AI</option>
            </select>
          </label>
        </div>
        <label className="aq-field">
          Project summary (at least 30 characters)
          <textarea
            value={values.summary}
            maxLength={2000}
            onChange={(e) => set('summary', e.target.value)}
            placeholder="What problem did you solve, and how?"
          />
        </label>
        <div className="aq-form-2">
          <label className="aq-field">
            Code repository (HTTPS)
            <input
              type="url"
              value={values.repositoryUrl ?? ''}
              onChange={(e) => set('repositoryUrl', e.target.value)}
              placeholder="https://github.com/..."
            />
          </label>
          <label className="aq-field">
            Live demo (HTTPS, optional)
            <input
              type="url"
              value={values.demoUrl ?? ''}
              onChange={(e) => set('demoUrl', e.target.value)}
              placeholder="https://..."
            />
          </label>
        </div>
        <label className="aq-field">
          Skills demonstrated (comma separated)
          <input
            value={values.skills.join(', ')}
            onChange={(e) =>
              set(
                'skills',
                e.target.value
                  .split(',')
                  .map((v) => v.trim())
                  .filter(Boolean),
              )
            }
          />
        </label>
        <label className="aq-field">
          Reflection (at least 30 characters)
          <textarea
            value={values.reflection}
            maxLength={3000}
            onChange={(e) => set('reflection', e.target.value)}
            placeholder="What failed, what did you learn, and what would you improve?"
          />
        </label>
        <div className="aq-rate-row">
          <button className="aq-primary" disabled={save.isPending} onClick={() => save.mutate()}>
            {editing ? 'Save changes' : 'Create draft'}
          </button>
          {editing && (
            <button
              className="aq-outline"
              onClick={() => {
                setEditing(null);
                setValues(initial);
              }}
            >
              Cancel
            </button>
          )}
        </div>
        {save.isError && (
          <p role="alert" className="aq-error">
            {save.error.message}
          </p>
        )}
      </section>
      <h2>Your projects</h2>
      {notice && <p role="status">{notice}</p>}
      {projects.isError && <p role="alert">{projects.error.message}</p>}
      <div className="aq-exp-grid">
        {projects.data?.data.map((item) => (
          <article key={item.id} className="aq-exp-card">
            <span className="aq-pill">{item.status}</span>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <p>{item.skills.join(' · ')}</p>
            <div className="aq-rate-row">
              {item.status === 'draft' && (
                <>
                  <button className="aq-outline" onClick={() => startEdit(item)}>
                    Edit
                  </button>
                  <button
                    className="aq-primary"
                    disabled={action.isPending}
                    onClick={() => action.mutate({ id: item.id, verb: 'submit' })}
                  >
                    <CheckCircle2 size={16} /> Submit
                  </button>
                </>
              )}
              {item.status === 'submitted' && (
                <button
                  className="aq-primary"
                  disabled={action.isPending}
                  onClick={() => action.mutate({ id: item.id, verb: 'publish' })}
                >
                  <Share2 size={16} /> Publish publicly
                </button>
              )}
              {item.status === 'published' && (
                <>
                  <a
                    className="aq-outline"
                    href={`/showcase/${item.slug}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Link size={16} /> Public link
                  </a>
                  <button
                    className="aq-outline"
                    disabled={action.isPending}
                    onClick={() => action.mutate({ id: item.id, verb: 'unpublish' })}
                  >
                    Unpublish
                  </button>
                </>
              )}
              <button
                className="aq-outline"
                disabled={remove.isPending}
                onClick={() => {
                  if (window.confirm('Delete this project permanently?')) remove.mutate(item.id);
                }}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
        {!projects.data?.data.length && (
          <article className="aq-exp-card">
            <h3>No capstones yet</h3>
            <p>Start with a small project tied to something you learned.</p>
          </article>
        )}
      </div>
      {action.isError && (
        <p role="alert" className="aq-error">
          {action.error.message}
        </p>
      )}
      {remove.isError && (
        <p role="alert" className="aq-error">
          {remove.error.message}
        </p>
      )}
      <p className="aq-muted">
        Public showcases are self-published and explicitly marked as unverified. Do not include
        secrets, private data, or proprietary project details.
      </p>
    </div>
  );
}
export function PublicShowcasePage() {
  const slug = window.location.pathname.split('/').pop() ?? '';
  const { data, error } = useQuery({
    queryKey: ['showcase', slug],
    queryFn: () =>
      api<{ data: Project & { verification: string } }>(
        `/public/portfolio/${encodeURIComponent(slug)}`,
      ),
    retry: false,
  });
  return (
    <div className="aq-public-showcase">
      <header>
        <a href="/">AI Quest</a> · Learner showcase
      </header>
      {error && <p role="alert">This showcase is unavailable or no longer public.</p>}
      {data && (
        <article className="aq-exp-card">
          <span className="aq-kicker">SELF-PUBLISHED AI PROJECT</span>
          <h1>{data.data.title}</h1>
          <p>{data.data.summary}</p>
          <h2>Skills</h2>
          <p>{data.data.skills.join(' · ')}</p>
          <h2>What I learned</h2>
          <p>{data.data.reflection}</p>
          {data.data.repositoryUrl && (
            <p>
              <a href={data.data.repositoryUrl} target="_blank" rel="noopener noreferrer">
                View source code
              </a>
            </p>
          )}
          {data.data.demoUrl && (
            <p>
              <a href={data.data.demoUrl} target="_blank" rel="noopener noreferrer">
                View demo
              </a>
            </p>
          )}
          <small>{data.data.verification}</small>
        </article>
      )}
    </div>
  );
}
