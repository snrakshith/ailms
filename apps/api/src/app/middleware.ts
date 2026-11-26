import { randomUUID } from 'node:crypto';
import { trace } from '@opentelemetry/api';
import type { ErrorRequestHandler, RequestHandler } from 'express';
import { ZodError } from 'zod';
import { requestContext } from '../core/context/request-context.js';
import { HttpError } from '../core/errors/http-error.js';
import { logger } from '../infrastructure/observability/logging/logger.js';
import { captureServerError } from '../infrastructure/observability/sentry.js';

export const requestId: RequestHandler = (req, res, next) => {
  const supplied = req.get('x-request-id');
  const id = supplied && /^[a-zA-Z0-9_-]{1,80}$/.test(supplied) ? supplied : randomUUID();
  res.setHeader('x-request-id', id);
  requestContext.run({ requestId: id }, next);
};
export const errorHandler: ErrorRequestHandler = (error: unknown, req, res, _next) => {
  if (res.headersSent) return _next(error);
  let status = 500;
  let code = 'internal_error';
  let detail = 'An unexpected error occurred';
  let errors: unknown;
  if (error instanceof HttpError) {
    status = error.status;
    detail = error.message;
    code = error.code;
    errors = error.details;
  } else if (error instanceof ZodError) {
    status = 422;
    code = 'validation_error';
    detail = 'Request validation failed';
    errors = error.flatten();
  } else if (
    error &&
    typeof error === 'object' &&
    'type' in error &&
    (error as { type: string }).type === 'entity.parse.failed'
  ) {
    status = 400;
    code = 'invalid_json';
    detail = 'Malformed JSON body';
  }
  if (status >= 500) {
    logger.error({ err: error, requestId: requestContext.getStore()?.requestId }, 'request failed');
    captureServerError(error);
  }
  const traceId = trace.getActiveSpan()?.spanContext().traceId;
  res
    .status(status)
    .type('application/problem+json')
    .json({
      type: `https://api.sapling.local/problems/${code}`,
      title: code.replace(/_/g, ' '),
      status,
      detail,
      requestId: requestContext.getStore()?.requestId,
      traceId,
      ...(errors ? { errors } : {}),
    });
};
