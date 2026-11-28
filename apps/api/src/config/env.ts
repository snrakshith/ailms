import { config as loadDotEnv } from 'dotenv';
import { resolve } from 'node:path';
loadDotEnv({ path: resolve(process.cwd(), '../../.env') });
import { z } from 'zod';

const booleanString = z
  .enum(['true', 'false'])
  .default('false')
  .transform((v) => v === 'true');
const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  API_PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  WEB_ORIGIN: z.string().url().default('http://localhost:5173'),
  // Docker Compose supplies an empty string for disabled optional providers.
  GOOGLE_CLIENT_ID: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
  MONGODB_URI: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  COOKIE_SECURE: booleanString,
  REDIS_URL: z.string().url().optional(),
  CACHE_ENABLED: booleanString,
  QUEUE_ENABLED: booleanString,
  OTEL_ENABLED: booleanString,
  OTEL_SERVICE_NAME: z.string().default('sapling-api'),
  OTEL_EXPORTER_OTLP_ENDPOINT: z.string().url().optional(),
  METRICS_TOKEN: z.string().min(32),
  CASHFREE_ENABLED: booleanString,
  CASHFREE_ENV: z.enum(['sandbox', 'production']).default('sandbox'),
  CASHFREE_CLIENT_ID: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
  CASHFREE_CLIENT_SECRET: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
  CASHFREE_WEBHOOK_URL: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined)
    .pipe(z.string().url().optional()),
  GENAI_PASS_PRICE_PAISE: z.coerce.number().int().min(100).max(10000000).default(49900),
  SES_ENABLED: booleanString,
  AWS_REGION: z.string().default('ap-south-1'),
  SES_FROM_EMAIL: z
    .string()
    .optional()
    .transform((v) => v?.trim() || undefined),
  SENTRY_DSN: z
    .string()
    .optional()
    .transform((v) => v?.trim() || undefined),
  INVOICE_SELLER_NAME: z.string().default('AI Quest'),
  INVOICE_SELLER_ADDRESS: z.string().default(''),
  INVOICE_SELLER_GSTIN: z.string().default(''),
});
const parsed = schema.safeParse(process.env);
if (!parsed.success) throw new Error(`Configuration error: ${parsed.error.message}`);
export const env = parsed.data;
if (env.NODE_ENV === 'production' && !env.WEB_ORIGIN.startsWith('https://')) {
  throw new Error('WEB_ORIGIN must use HTTPS in production');
}
if (env.NODE_ENV === 'production' && !env.COOKIE_SECURE) {
  throw new Error('COOKIE_SECURE must be enabled in production');
}
if ((env.CACHE_ENABLED || env.QUEUE_ENABLED) && !env.REDIS_URL) {
  throw new Error('REDIS_URL is required when caching or background jobs are enabled');
}

if (env.CASHFREE_ENABLED) {
  if (!env.CASHFREE_CLIENT_ID || !env.CASHFREE_CLIENT_SECRET)
    throw new Error('Cashfree enabled but credentials are missing');
  if (env.NODE_ENV === 'production') {
    if (env.CASHFREE_ENV !== 'production')
      throw new Error('Production must use CASHFREE_ENV=production');
    if (!env.CASHFREE_WEBHOOK_URL?.startsWith('https://'))
      throw new Error('Production Cashfree requires a public HTTPS webhook URL');
  }
}

if (env.SES_ENABLED && !env.SES_FROM_EMAIL)
  throw new Error('SES_FROM_EMAIL is required when SES_ENABLED=true');
if (env.NODE_ENV === 'production' && env.SES_ENABLED && !env.QUEUE_ENABLED)
  throw new Error('Production SES requires QUEUE_ENABLED=true for retryable email delivery');
