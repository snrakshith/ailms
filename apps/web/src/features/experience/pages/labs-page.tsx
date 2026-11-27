import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { LibraryResource } from '@sapling/contracts';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '../../../core/api/client';
import { compareTexts, confusionMatrix } from '@aiquest/learning-core';
import { useDocumentTitle } from '../../../shared/hooks/use-document-title';
import {
  FlaskConical,
  Play,
  SquareTerminal,
  BrainCircuit,
  BarChart3,
  GitCompareArrows,
} from 'lucide-react';
type Challenge = {
  id: string;
  title: string;
  description: string;
  level: string;
  track: string;
  starter: string;
  tests: string;
};
type RunnerResult = { ok: boolean; message?: string; error?: string; output?: string };
export function LabsPage() {
  useDocumentTitle('AI Learning Labs');
  const [tab, setTab] = useState<'curriculum' | 'python' | 'vectors' | 'metrics' | 'models'>(
    'curriculum',
  );
  const { data } = useQuery({
    queryKey: ['labs', 'challenges'],
    queryFn: () => api<{ data: Challenge[] }>('/labs/challenges'),
  });
  const curriculum = useQuery({
    queryKey: ['learning', 'resources'],
    queryFn: () => api<{ data: LibraryResource[] }>('/learning/resources'),
  });
  const labs = (curriculum.data?.data ?? []).filter((item) => item.kind === 'lab');
  const [curriculumLab, setCurriculumLab] = useState<LibraryResource | null>(null);
  const [labSource, setLabSource] = useState('');
  useEffect(() => {
    if (!curriculumLab) return;
    void fetch(`/api/v1/learning/resources/${encodeURIComponent(curriculumLab.id)}`)
      .then(async (response) => {
        if (!response.ok) throw new Error('Unable to load lab');
        setLabSource(await response.text());
      })
      .catch(() =>
        setLabSource('Unable to load this lab preview. Download the file to use it locally.'),
      );
  }, [curriculumLab]);
  const [challenge, setChallenge] = useState('python-mean');
  const selected = data?.data.find((v) => v.id === challenge);
  const [code, setCode] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [runResult, setRunResult] = useState<RunnerResult | null>(null);
  const activeFrame = useRef<HTMLIFrameElement | null>(null);
  useEffect(() => () => activeFrame.current?.remove(), []);
  const [a, setA] = useState('React component lifecycle and state management');
  const [b, setB] = useState('Neural network weights and model state');
  const vectorResult = compareTexts(a, b);
  const remoteCompare = useMutation({
    mutationFn: () =>
      api<{ data: { similarity: number; engine: string } }>(`/labs/compare`, {
        method: 'POST',
        body: JSON.stringify({ a, b }),
      }),
  });
  const hosted = useQuery({
    queryKey: ['model-playground', 'models'],
    queryFn: () =>
      api<{ data: { available: boolean; models: string[]; dailyLimit: number } }>(
        '/model-playground/models',
      ),
  });
  const [prompt, setPrompt] = useState('Explain why embeddings are useful for semantic search.');
  const modelCompare = useMutation({
    mutationFn: () =>
      api<{
        data: {
          results: {
            model: string;
            text?: string;
            error?: string;
            latencyMs: number;
            totalTokens?: number | null;
          }[];
          remaining: number;
          disclaimer: string;
        };
      }>('/model-playground/compare', {
        method: 'POST',
        body: JSON.stringify({ prompt }),
        timeoutMs: 35000,
      }),
  });
  const [threshold, setThreshold] = useState(0.5);
  const actual = [true, true, true, false, false, false, true, false];
  const probabilities = [0.96, 0.67, 0.34, 0.75, 0.24, 0.12, 0.82, 0.54];
  const metrics = confusionMatrix(
    actual,
    probabilities.map((p) => p >= threshold),
  );
  const execute = () => {
    if (!selected) return;
    activeFrame.current?.remove();
    setRunning(true);
    setRunResult(null);
    const iframe = document.createElement('iframe');
    iframe.sandbox.add('allow-scripts');
    iframe.src = '/pyodide.sandbox.html';
    iframe.setAttribute('aria-hidden', 'true');
    iframe.tabIndex = -1;
    iframe.style.cssText =
      'position:absolute;left:-10000px;width:1px;height:1px;opacity:0;pointer-events:none';
    activeFrame.current = iframe;
    const nonce = crypto.randomUUID();
    let settled = false;
    const cleanup = () => {
      settled = true;
      clearTimeout(timer);
      window.removeEventListener('message', onMessage);
      iframe.remove();
      if (activeFrame.current === iframe) activeFrame.current = null;
      setRunning(false);
    };
    const onMessage = (
      event: MessageEvent<{
        type: string;
        nonce: string;
        ok: boolean;
        message?: string;
        error?: string;
        output?: string;
      }>,
    ) => {
      if (
        event.source !== iframe.contentWindow ||
        event.origin !== 'null' ||
        event.data?.type !== 'aiquest:python:result' ||
        event.data.nonce !== nonce ||
        settled
      )
        return;
      setRunResult(event.data);
      cleanup();
    };
    const timer = setTimeout(() => {
      if (settled) return;
      setRunResult({
        ok: false,
        error: 'Python execution timed out. Simplify the code or check network access.',
      });
      cleanup();
    }, 30000);
    window.addEventListener('message', onMessage);
    iframe.onload = () =>
      iframe.contentWindow?.postMessage(
        {
          type: 'aiquest:python:run',
          nonce,
          code: code ?? selected.starter,
          tests: selected.tests,
        },
        '*',
      );
    document.body.appendChild(iframe);
  };
  return (
    <div className="aq-page aq-experience">
      <span className="aq-kicker">P1 · EXPERIMENT & BUILD</span>
      <h1>Interactive AI labs</h1>
      <p>
        Explore concepts experimentally. Python runs in an opaque-origin iframe and disposable
        browser worker; its tests are formative and do not award XP.
      </p>
      <div className="aq-tab-row" role="group" aria-label="Lab type">
        {(
          [
            ['curriculum', 'Curriculum labs', FlaskConical],
            ['python', 'Explore Python', SquareTerminal],
            ['vectors', 'Text vectors', BrainCircuit],
            ['metrics', 'Model metrics', BarChart3],
            ['models', 'Model comparison', GitCompareArrows],
          ] as const
        ).map(([id, label, Icon]) => (
          <button
            key={id}
            className={`aq-outline ${tab === id ? 'aq-tab-active' : ''}`}
            aria-pressed={tab === id}
            onClick={() => setTab(id)}
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
      </div>
      {tab === 'curriculum' && (
        <section className="aq-exp-card">
          <h2>
            <FlaskConical size={20} /> Curriculum labs
          </h2>
          <p>
            Start with the learner lab guides and starter files that belong to this course. Preview
            or edit a copy here, then download it for your local notebook or editor.
          </p>
          {curriculumLab ? (
            <>
              <h3>{curriculumLab.title}</h3>
              <textarea
                className="aq-code-editor"
                spellCheck={false}
                value={labSource}
                onChange={(e) => setLabSource(e.target.value)}
                rows={14}
              />
              <a
                className="aq-primary"
                href={`/api/v1/learning/resources/${encodeURIComponent(curriculumLab.id)}`}
              >
                Download {curriculumLab.filename}
              </a>
              <button className="aq-outline" onClick={() => setCurriculumLab(null)}>
                Back to labs
              </button>
            </>
          ) : (
            <div className="aq-exp-grid">
              {labs.map((lab) => (
                <article key={lab.id} className="aq-exp-card">
                  <h3>{lab.title}</h3>
                  <p>
                    {lab.moduleId ?? lab.pathId} · {lab.filename}
                  </p>
                  <button className="aq-outline" onClick={() => setCurriculumLab(lab)}>
                    Preview and edit
                  </button>
                  <a
                    className="aq-text-link"
                    href={`/api/v1/learning/resources/${encodeURIComponent(lab.id)}`}
                  >
                    Download
                  </a>
                </article>
              ))}
            </div>
          )}
          {!labs.length && !curriculum.isPending && (
            <p>
              No learner labs are currently available. Browse{' '}
              <Link to="/library">the resource library</Link>.
            </p>
          )}
        </section>
      )}
      {tab === 'python' && (
        <section className="aq-exp-card">
          <h2>
            <FlaskConical size={20} /> Python coding challenges
          </h2>
          <label className="aq-field">
            Challenge
            <select
              value={challenge}
              onChange={(e) => {
                setChallenge(e.target.value);
                setCode(null);
                setRunResult(null);
              }}
            >
              {data?.data.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </label>
          <p>{selected?.description}</p>
          <label className="aq-field">
            Python source code
            <textarea
              className="aq-code-editor"
              spellCheck={false}
              value={code ?? selected?.starter ?? ''}
              onChange={(e) => setCode(e.target.value)}
              rows={11}
            />
          </label>
          <button className="aq-primary" onClick={execute} disabled={running || !selected}>
            <Play size={16} />
            {running ? 'Running in Python…' : 'Run formative tests'}
          </button>
          {runResult && (
            <div
              className={`aq-exp-result ${runResult.ok ? 'aq-exp-ok' : 'aq-exp-fail'}`}
              role="status"
            >
              <strong>{runResult.ok ? runResult.message : 'Check your code'}</strong>
              <pre>{runResult.output || runResult.error || 'No output'}</pre>
            </div>
          )}
          <p className="aq-muted">
            First run downloads the pinned Pyodide Python runtime. Worker execution is client-side
            only; arbitrary Python is not sent to our API. The iframe has no access to app cookies,
            storage or host DOM. Production still needs browser security validation.
          </p>
        </section>
      )}
      {tab === 'vectors' && (
        <section className="aq-exp-card">
          <h2>Compare text similarity</h2>
          <p>
            This educational experiment uses **local TF-weighted lexical vectors**, not real neural
            embeddings. Change the text to see how similarity changes.
          </p>
          <div className="aq-form-2">
            <label className="aq-field">
              Text A<textarea value={a} maxLength={3000} onChange={(e) => setA(e.target.value)} />
            </label>
            <label className="aq-field">
              Text B<textarea value={b} maxLength={3000} onChange={(e) => setB(e.target.value)} />
            </label>
          </div>
          <strong>Cosine similarity: {Math.round(vectorResult.similarity * 100)}%</strong>
          <p>Shared tokens: {vectorResult.common.join(', ') || 'none'}</p>
          <button
            className="aq-outline"
            disabled={remoteCompare.isPending || !a || !b}
            onClick={() => remoteCompare.mutate()}
          >
            Verify with server-side model playground
          </button>
          {remoteCompare.data && (
            <p role="status">
              Server: {Math.round(remoteCompare.data.data.similarity * 100)}% ·{' '}
              {remoteCompare.data.data.engine}
            </p>
          )}
        </section>
      )}
      {tab === 'models' && (
        <section className="aq-exp-card">
          <h2>Compare hosted AI models</h2>
          <p>
            Run the same educational prompt against two configured model IDs. Responses are live
            only when an API provider and both models are configured on the server.
          </p>
          <p>
            {hosted.data?.data.available
              ? `Available: ${hosted.data.data.models.join(' vs ')}`
              : 'Hosted model comparison is disabled. Set AIQUEST_LLM_KEY and AIQUEST_LLM_COMPARE_MODELS in the API environment.'}
          </p>
          <label className="aq-field">
            Comparison prompt
            <textarea maxLength={1200} value={prompt} onChange={(e) => setPrompt(e.target.value)} />
          </label>
          <button
            className="aq-primary"
            disabled={
              !hosted.data?.data.available || prompt.trim().length < 10 || modelCompare.isPending
            }
            onClick={() => modelCompare.mutate()}
          >
            Compare live models
          </button>
          {modelCompare.isError && (
            <p role="alert" className="aq-error">
              {modelCompare.error.message}
            </p>
          )}
          <div className="aq-exp-grid">
            {modelCompare.data?.data.results.map((item) => (
              <div className="aq-exp-result" key={item.model}>
                <strong>{item.model}</strong>
                <p>
                  Latency: {item.latencyMs} ms · Token usage: {item.totalTokens ?? 'unavailable'}
                </p>
                <p>{item.text ?? item.error}</p>
              </div>
            ))}
          </div>
          {modelCompare.data && (
            <p>
              {modelCompare.data.data.remaining} comparisons left today.{' '}
              {modelCompare.data.data.disclaimer}
            </p>
          )}
        </section>
      )}
      {tab === 'metrics' && (
        <section className="aq-exp-card">
          <h2>Confusion matrix simulator</h2>
          <p>
            Adjust the prediction threshold for the same eight examples. Observe false positives and
            false negatives.
          </p>
          <label className="aq-field">
            Threshold: {threshold.toFixed(2)}
            <input
              type="range"
              min="0.1"
              max="0.9"
              step="0.05"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
            />
          </label>
          <div className="aq-exp-stats">
            <div>
              <strong>{metrics.tp}</strong>
              <span>True positive</span>
            </div>
            <div>
              <strong>{metrics.fp}</strong>
              <span>False positive</span>
            </div>
            <div>
              <strong>{metrics.fn}</strong>
              <span>False negative</span>
            </div>
            <div>
              <strong>{metrics.tn}</strong>
              <span>True negative</span>
            </div>
          </div>
          <p>
            Accuracy: {(metrics.accuracy * 100).toFixed(0)}% · Precision:{' '}
            {(metrics.precision * 100).toFixed(0)}% · Recall: {(metrics.recall * 100).toFixed(0)}% ·
            F1: {metrics.f1.toFixed(2)}
          </p>
        </section>
      )}
    </div>
  );
}
