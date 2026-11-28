import { useEffect, useState } from 'react';
import { ExternalLink, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';
import { PublicLayout } from '../components/public-layout';
import { config } from '../../../config/env';
import { siteContent } from '../content/site-content';
import { useDocumentTitle } from '../../../shared/hooks/use-document-title';
type Status = 'checking' | 'online' | 'down';
export function StatusPage() {
  useDocumentTitle('Status', siteContent.status.description);
  const [live, setLive] = useState<Status>('checking');
  const [ready, setReady] = useState<Status>('checking');
  useEffect(() => {
    const controller = new AbortController();
    async function check(path: string, update: (value: Status) => void) {
      try {
        const response = await fetch(path, { signal: controller.signal, cache: 'no-store' });
        update(response.ok ? 'online' : 'down');
      } catch {
        if (!controller.signal.aborted) update('down');
      }
    }
    void check('/health/live', setLive);
    void check('/health/ready', setReady);
    return () => controller.abort();
  }, []);
  return (
    <PublicLayout>
      <div className="mkt-container aq-status-page">
        <span className="mkt-eyebrow">INFRASTRUCTURE</span>
        <h1>Service status</h1>
        <p>
          These are live checks from your browser, not historical uptime guarantees. Independent
          monitoring remains accessible when the app is unavailable.
        </p>
        <div className="aq-status-cards">
          {[
            { label: 'API process', value: live },
            { label: 'API dependencies', value: ready },
          ].map((item) => (
            <div key={item.label} className="aq-status-card">
              {item.value === 'online' ? (
                <CheckCircle2 size={21} />
              ) : item.value === 'down' ? (
                <AlertCircle size={21} />
              ) : (
                <Activity size={21} />
              )}
              <strong>{item.label}</strong>
              <span>
                {item.value === 'checking'
                  ? 'Checking…'
                  : item.value === 'online'
                    ? 'Responding'
                    : 'Not responding / unavailable'}
              </span>
            </div>
          ))}
        </div>
        {config.statusPageUrl ? (
          <a
            className="mkt-button mkt-button-dark"
            href={config.statusPageUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Independent status & incidents <ExternalLink size={16} />
          </a>
        ) : (
          <p className="aq-status-note">
            Independent incident history is not configured yet. Connect Better Stack or Upptime and
            set VITE_STATUS_PAGE_URL.
          </p>
        )}
      </div>
    </PublicLayout>
  );
}
