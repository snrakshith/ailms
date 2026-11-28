import { randomBytes, createHash } from 'node:crypto';
import { Router } from 'express';
import { z } from 'zod';
import { loginSchema, registerSchema } from '@sapling/contracts';
import { validateBody } from '../../core/contracts/validate.js';
import { authRateLimit } from '../../infrastructure/security/rate-limit.js';
import { issueMobileAccessToken } from '../../infrastructure/security/session.js';
import { HttpError } from '../../core/errors/http-error.js';
import { UserModel } from '../../infrastructure/database/mongodb/models.js';
import { publicUser } from './users.repository.js';
import { NativeRefreshModel } from './native-auth.models.js';
import { registerUser, loginUser } from './users.service.js';
import { signInWithGoogle } from './google-identity.js';
const refreshSchema = z.object({ refreshToken: z.string().min(30).max(200) }).strict();
const digest = (token: string) => createHash('sha256').update(token).digest('hex');
async function issueNativeSession(user: {
  id: string;
  name: string;
  email: string;
  tenantId: string;
  role: 'owner' | 'member';
  onboarding?: import('@sapling/contracts').LearnerOnboarding | null;
}) {
  const refreshToken = randomBytes(48).toString('base64url');
  await NativeRefreshModel.create({
    userId: user.id,
    tokenHash: digest(refreshToken),
    expiresAt: new Date(Date.now() + 30 * 86400000),
  });
  return {
    user,
    accessToken: await issueMobileAccessToken(user),
    expiresInSeconds: 1800,
    refreshToken,
  };
}
/** Cookie-free mobile auth with a short-lived access token and rotating opaque refresh token. */
export function createNativeAuthRouter() {
  const router = Router();
  router.post('/login', authRateLimit, validateBody(loginSchema), async (req, res) => {
    res.setHeader('cache-control', 'no-store');
    res.json(await issueNativeSession(await loginUser(req.body)));
  });
  router.post('/register', authRateLimit, validateBody(registerSchema), async (req, res) => {
    res.setHeader('cache-control', 'no-store');
    res.status(201).json(await issueNativeSession(await registerUser(req.body)));
  });
  router.post(
    '/google',
    authRateLimit,
    validateBody(z.object({ credential: z.string().min(100).max(12000) }).strict()),
    async (req, res) => {
      res.setHeader('cache-control', 'no-store');
      res.json(await issueNativeSession(await signInWithGoogle(req.body.credential)));
    },
  );
  router.post('/refresh', authRateLimit, validateBody(refreshSchema), async (req, res) => {
    const now = new Date();
    const saved = await NativeRefreshModel.findOneAndUpdate(
      { tokenHash: digest(req.body.refreshToken), revokedAt: null, expiresAt: { $gt: now } },
      { $set: { revokedAt: now } },
      { new: true },
    );
    if (!saved) throw new HttpError(401, 'Refresh token invalid or expired', 'invalid_refresh');
    const member = await UserModel.findById(saved.userId).lean();
    if (!member) throw new HttpError(401, 'Account no longer exists', 'unauthorized');
    const user = publicUser(member);
    res.setHeader('cache-control', 'no-store');
    res.json(await issueNativeSession(user));
  });
  router.post('/logout', authRateLimit, validateBody(refreshSchema), async (req, res) => {
    await NativeRefreshModel.updateOne(
      { tokenHash: digest(req.body.refreshToken) },
      { $set: { revokedAt: new Date() } },
    );
    res.status(204).end();
  });
  return router;
}
