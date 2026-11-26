import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { pinoHttp } from 'pino-http';
import swaggerUi from 'swagger-ui-express';
import { env } from '../config/env.js';
import { requestId, errorHandler } from './middleware.js';
import { HttpError } from '../core/errors/http-error.js';
import { globalRateLimit } from '../infrastructure/security/rate-limit.js';
import { checkCsrf } from '../infrastructure/security/csrf.js';
import {
  metricsMiddleware,
  metricsHandler,
} from '../infrastructure/observability/metrics/metrics.js';
import { logger } from '../infrastructure/observability/logging/logger.js';
import { databaseReady } from '../infrastructure/database/mongodb/connection.js';
import { cacheReady } from '../infrastructure/cache/cache.js';
import { createUsersRouter } from '../modules/users/users.routes.js';
import { createNativeAuthRouter } from '../modules/users/native-auth.routes.js';
import { createTasksRouter } from '../modules/tasks/tasks.routes.js';
import { createAuditRouter } from '../modules/audit/audit.routes.js';
import { createLearningRouter } from '../modules/learning/learning.routes.js';
import { createContentRouter } from '../modules/content/content.routes.js';
import { createReviewsRouter } from '../modules/reviews/reviews.routes.js';
import { createTutorRouter } from '../modules/tutor/tutor.routes.js';
import { createLabsRouter } from '../modules/labs/labs.routes.js';
import { createModelCompareRouter } from '../modules/labs/models.routes.js';
import {
  createPortfolioRouter,
  createPublicPortfolioRouter,
} from '../modules/portfolio/portfolio.routes.js';
import { createPrivacyRouter } from '../modules/privacy/privacy.routes.js';
import { cashfreeWebhook, createBillingRouter } from '../modules/billing/billing.routes.js';
import { openapi } from './openapi.js';
import { createReferralRouter } from '../modules/referrals/referral.routes.js';

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  // Set trust proxy only for known reverse proxies in your deployment.
  app.use(helmet({ contentSecurityPolicy: env.NODE_ENV === 'production' ? undefined : false }));
  app.use(cors({ origin: env.WEB_ORIGIN, credentials: true }));
  app.use(requestId, pinoHttp({ logger }), metricsMiddleware, globalRateLimit);
  // Raw bytes are required for Cashfree signature verification. Never run JSON parsing first.
  app.post(
    '/api/v1/billing/webhook',
    express.raw({ type: 'application/json', limit: '64kb' }),
    cashfreeWebhook,
  );
  app.use(express.json({ limit: '100kb' }), cookieParser());
  app.get('/health/live', (_req, res) => {
    res.setHeader('cache-control', 'no-store');
    res.json({ status: 'alive' });
  });
  app.get('/health/ready', (_req, res) => {
    res.setHeader('cache-control', 'no-store');
    if (!databaseReady() || !cacheReady()) {
      res.status(503).json({ status: 'not_ready' });
      return;
    }
    res.json({ status: 'ready' });
  });
  app.get('/internal/metrics', metricsHandler);
  app.get('/openapi.json', (_req, res) => res.json(openapi));
  if (env.NODE_ENV !== 'production') app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi));
  // Native sign-in is credential-only and never accepts a browser cookie session.
  app.use('/api/v1/native-auth', createNativeAuthRouter());
  app.use('/api/v1', checkCsrf);
  app.use('/api/v1/auth', createUsersRouter());
  app.use('/api/v1/tasks', createTasksRouter());
  app.use('/api/v1/learning', createLearningRouter());
  app.use('/api/v1/billing', createBillingRouter());
  app.use('/api/v1/referrals', createReferralRouter());
  app.use('/api/v1/content', createContentRouter());
  app.use('/api/v1/reviews', createReviewsRouter());
  app.use('/api/v1/tutor', createTutorRouter());
  app.use('/api/v1/labs', createLabsRouter());
  app.use('/api/v1/model-playground', createModelCompareRouter());
  app.use('/api/v1/portfolio', createPortfolioRouter());
  app.use('/api/v1/public/portfolio', createPublicPortfolioRouter());
  app.use('/api/v1/privacy', createPrivacyRouter());
  app.use('/api/v1/audit', createAuditRouter());
  app.use((_req, _res, next) => next(new HttpError(404, 'Endpoint not found', 'not_found')));
  app.use(errorHandler);
  return app;
}
