import { rateLimit } from 'express-rate-limit';
export const globalRateLimit = rateLimit({
  windowMs: 60_000,
  limit: 180,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});
export const authRateLimit = rateLimit({
  windowMs: 15 * 60_000,
  limit: process.env.NODE_ENV === 'test' ? 1000 : 12,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { title: 'Too many attempts', status: 429 },
});
// For multiple API replicas, replace the in-memory store with a shared Redis store.

/** Money-moving routes have tighter abuse limits than general learning APIs. */
export const checkoutRateLimit = rateLimit({
  windowMs: 15 * 60_000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});
