import { randomBytes, createHmac, timingSafeEqual } from 'node:crypto';
import type { RequestHandler } from 'express';
import { env } from '../../config/env.js';
import { HttpError } from '../../core/errors/http-error.js';
import { verifyMobileAccessToken } from './session.js';

function sign(token: string) {
  return createHmac('sha256', env.JWT_SECRET).update(`csrf:${token}`).digest('hex');
}
export const csrfCookieOptions = {
  httpOnly: false,
  secure: env.COOKIE_SECURE,
  sameSite: 'strict' as const,
  path: '/api',
  maxAge: 2 * 60 * 60 * 1000,
};
export const issueCsrf: RequestHandler = (_req, res) => {
  const random = randomBytes(24).toString('hex');
  const token = `${random}.${sign(random)}`;
  res.cookie('csrf', token, csrfCookieOptions).json({ token });
};
export const checkCsrf: RequestHandler = async (req, _res, next) => {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
  // Native-only bearer tokens are CSRF-immune; verify signature, issuer and audience.
  // Browser cookie sessions always require the original double-submit CSRF protection.
  const mobile = /^Bearer ([^\s]+)$/.exec(req.get('authorization') ?? '');
  if (mobile && !req.get('origin')) {
    try {
      await verifyMobileAccessToken(mobile[1]);
      return next();
    } catch {
      return next(new HttpError(401, 'Invalid native access token', 'unauthorized'));
    }
  }
  const origin = req.get('origin');
  if (origin && origin !== env.WEB_ORIGIN)
    return next(new HttpError(403, 'Disallowed origin', 'csrf_rejected'));
  const header = req.get('x-csrf-token') ?? '';
  const cookie = req.cookies?.csrf as string | undefined;
  if (
    !cookie ||
    !header ||
    cookie.length !== header.length ||
    !timingSafeEqual(Buffer.from(cookie), Buffer.from(header))
  )
    return next(new HttpError(403, 'Invalid CSRF token', 'csrf_rejected'));
  const [random, mac, ...rest] = cookie.split('.');
  const expected = random && sign(random);
  if (
    !expected ||
    !mac ||
    rest.length ||
    mac.length !== expected.length ||
    !timingSafeEqual(Buffer.from(mac), Buffer.from(expected))
  )
    return next(new HttpError(403, 'Invalid CSRF signature', 'csrf_rejected'));
  next();
};
