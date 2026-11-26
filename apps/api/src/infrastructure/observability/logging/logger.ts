import pino from 'pino';
import { env } from '../../../config/env.js';
export const logger = pino({
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  base: { service: 'sapling-api', environment: env.NODE_ENV },
  redact: { paths: ['req.headers.authorization','req.headers.cookie','password','*.password','token','*.token'], censor: '[REDACTED]' },
});
