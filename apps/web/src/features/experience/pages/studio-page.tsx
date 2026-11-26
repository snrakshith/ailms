import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { ReviewedContent } from '@sapling/contracts';
import { api } from '../../../core/api/client';
import { useDocumentTitle } from '../../../shared/hooks/use-document-title';
import { BookOpenText, Send, CheckCircle2 } from 'lucide-react';
type EditorialLesson = {
  id: string;
  title: string;
  publishedVersion: number;
  reviewStatus: string | null;
};
type EditorDetail = {
  lessonId: string;
  draft: null | { status: string; authorId: string; content: ReviewedContent };
  published: { version: number; content: ReviewedContent };
};
export function StudioPage() {
  useDocumentTitle('Content studio');
  const cache = useQueryClient();
  const [lessonId, setLessonId] = useState('');
  const [editor, setEditor] = useState('');
  const [message, setMessage] = useState('');
  const permissions = useQuery({
    queryKey: ['studio', 'me'],
    queryFn: () => api<{ canAuthor: boolean; canReview: boolean }>('/content/me'),
  });
  const list = useQuery({
    queryKey: ['studio', 'list'],
    queryFn: () => api<{ data: EditorialLesson[] }>('/content/lessons'),
    enabled: Boolean(permissions.data?.canAuthor || permissions.data?.canReview),
  });
  const lesson = useQuery({
    queryKey: ['studio', 'lesson', lessonId],
    queryFn: () => api<{ data: EditorDetail }>(`/content/lessons/${lessonId}`),
    enabled: Boolean(lessonId),
  });
  useEffect(() => {
    if (lesson.data)
      setEditor(
        JSON.stringify(
          lesson.data.data.draft?.content ?? lesson.data.data.published.content,
          null,
          2,
        ),
      );
  }, [lesson.data]);
  const mutate = useMutation({
    mutationFn: async (action: 'draft' | 'review' | 'return' | 'publish') => {
      const body =
        action === 'draft' ? JSON.stringify(JSON.parse(editor) as ReviewedContent) : undefined;
      return api<{ data: { status: string } }>(`/content/lessons/${lessonId}/${action}`, {
        method: 'POST',
        body,
      });
    },
    onSuccess: (result) => {
      setMessage(`Saved: ${result.data.status}`);
      void cache.invalidateQueries({ queryKey: ['studio'] });
    },
  });
  if (permissions.isPending) return <div className="aq-page">Loading permissions…</div>;
  if (!permissions.data?.canAuthor && !permissions.data?.canReview)
    return (
      <div className="aq-page aq-experience">
        <h1>Content studio</h1>
        <p>Content publishing is restricted to configured author and reviewer accounts.</p>
      </div>
    );
  return (
    <div className="aq-page aq-experience">
      <span className="aq-kicker">P1 · VERSIONED CURRICULUM</span>
      <h1>
        <BookOpenText size={26} /> Content studio
      </h1>
      <p>
        Edit lesson JSON, submit for independent review, and publish a new immutable release. Public
        learners only see published revisions.
      </p>
      <div className="aq-exp-card">
        <label className="aq-field">
          Select lesson
          <select
            value={lessonId}
            onChange={(e) => {
              setLessonId(e.target.value);
              setMessage('');
            }}
          >
            <option value="">Choose a lesson</option>
            {list.data?.data.map((v) => (
              <option key={v.id} value={v.id}>
                {v.title} (v{v.publishedVersion}
                {v.reviewStatus ? ` · ${v.reviewStatus}` : ''})
              </option>
            ))}
          </select>
        </label>
        {lessonId && lesson.data && (
          <>
            <p>
              Published version: {lesson.data.data.published.version} · Draft status:{' '}
              {lesson.data.data.draft?.status ?? 'none'}
            </p>
            <label className="aq-field">
              Structured lesson content
              <textarea
                className="aq-code-editor"
                rows={26}
                spellCheck={false}
                value={editor}
                onChange={(e) => setEditor(e.target.value)}
              />
            </label>
            <div className="aq-rate-row">
              {permissions.data?.canAuthor && (
                <>
                  <button
                    className="aq-outline"
                    disabled={mutate.isPending}
                    onClick={() => mutate.mutate('draft')}
                  >
                    Save draft
                  </button>
                  <button
                    className="aq-outline"
                    disabled={mutate.isPending}
                    onClick={() => mutate.mutate('review')}
                  >
                    <Send size={16} /> Submit for review
                  </button>
                </>
              )}
              {permissions.data?.canReview && (
                <>
                  <button
                    className="aq-outline"
                    disabled={mutate.isPending}
                    onClick={() => mutate.mutate('return')}
                  >
                    Request changes
                  </button>
                  <button
                    className="aq-primary"
                    disabled={mutate.isPending}
                    onClick={() => mutate.mutate('publish')}
                  >
                    <CheckCircle2 size={16} /> Publish release
                  </button>
                </>
              )}
            </div>
          </>
        )}
        {message && <p role="status">{message}</p>}
        {mutate.isError && (
          <p role="alert" className="aq-error">
            {mutate.error.message}
          </p>
        )}
      </div>
    </div>
  );
}
