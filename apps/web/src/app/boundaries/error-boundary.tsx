import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import * as Sentry from '@sentry/react';
export class ErrorBoundary extends Component<{ children: ReactNode }, { broken: boolean }> {
  state = { broken: false };
  static getDerivedStateFromError() {
    return { broken: true };
  }
  componentDidCatch(error: Error, _info: ErrorInfo) {
    if (import.meta.env.VITE_SENTRY_DSN) Sentry.captureException(error);
  }
  render() {
    return this.state.broken ? (
      <main className="crash">
        <h1>Something went wrong</h1>
        <p>Try refreshing the page.</p>
        <button onClick={() => window.location.reload()}>Reload</button>
      </main>
    ) : (
      this.props.children
    );
  }
}
