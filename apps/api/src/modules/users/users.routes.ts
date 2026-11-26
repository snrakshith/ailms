import { Router } from 'express';
import { z } from 'zod';
import { signInWithGoogle, linkGoogleToUser } from './google-identity.js';
import { loginSchema, registerSchema, onboardingSchema } from '@sapling/contracts';
import { validateBody } from '../../core/contracts/validate.js';
import { authRateLimit } from '../../infrastructure/security/rate-limit.js';
import { requireAuth, setSession, clearSession } from '../../infrastructure/security/session.js';
import { issueCsrf } from '../../infrastructure/security/csrf.js';
import { loginUser, registerUser } from './users.service.js';
import { UserModel } from '../../infrastructure/database/mongodb/models.js';
import { publicUser } from './users.repository.js';
import { NativeRefreshModel } from './native-auth.models.js';

export function createUsersRouter() {
  const router = Router();
  router.get('/csrf', issueCsrf);
  router.post('/register', authRateLimit, validateBody(registerSchema), async (req, res) => {
    const user = await registerUser(req.body);
    await setSession(res, user);
    res.setHeader('Cache-Control', 'no-store');
    res.status(201).json({ user });
  });
  router.post('/login', authRateLimit, validateBody(loginSchema), async (req, res) => {
    const user = await loginUser(req.body);
    await setSession(res, user);
    res.setHeader('Cache-Control', 'no-store');
    res.json({ user });
  });
  const googleCredentialSchema = z.object({ credential: z.string().min(100).max(12000) }).strict();
  router.post('/google', authRateLimit, validateBody(googleCredentialSchema), async (req, res) => {
    const user = await signInWithGoogle(req.body.credential);
    await setSession(res, user);
    res.setHeader('Cache-Control', 'no-store');
    res.json({ user });
  });
  router.post(
    '/google/link',
    requireAuth,
    authRateLimit,
    validateBody(googleCredentialSchema),
    async (req, res) => {
      const user = await linkGoogleToUser(req.principal!.id, req.body.credential);
      res.setHeader('Cache-Control', 'no-store');
      res.json({ user });
    },
  );
  // Logout revokes every issued browser/native access token for this user.
  router.post('/logout', requireAuth, async (req, res) => {
    await UserModel.updateOne({ _id: req.principal!.id }, { $inc: { sessionVersion: 1 } });
    await NativeRefreshModel.updateMany(
      { userId: req.principal!.id, revokedAt: null },
      { $set: { revokedAt: new Date() } },
    );
    clearSession(res);
    res.setHeader('Cache-Control', 'no-store');
    res.status(204).end();
  });
  router.get('/me', requireAuth, (req, res) => res.json({ user: req.principal }));
  router.put('/onboarding', requireAuth, validateBody(onboardingSchema), async (req, res) => {
    const updated = await UserModel.findByIdAndUpdate(
      req.principal!.id,
      { $set: { onboarding: req.body } },
      { new: true, runValidators: true },
    );
    if (!updated) {
      res.status(404).json({ error: 'User missing' });
      return;
    }
    res.json({ user: publicUser(updated) });
  });
  return router;
}
