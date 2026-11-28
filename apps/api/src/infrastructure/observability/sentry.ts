import * as Sentry from '@sentry/node';
import { env } from '../../config/env.js';
export function initializeSentry() {
  if (env.SENTRY_DSN)
    Sentry.init({ dsn: env.SENTRY_DSN, environment: env.NODE_ENV, tracesSampleRate: 0.05 });
}
export function captureServerError(error: unknown) {
  if (env.SENTRY_DSN) Sentry.captureException(error);
}
