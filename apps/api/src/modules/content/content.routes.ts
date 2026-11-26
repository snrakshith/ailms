import { Router } from 'express';
import { reviewedContentSchema } from '@sapling/contracts';
import { validateBody } from '../../core/contracts/validate.js';
import { requireAuth } from '../../infrastructure/security/session.js';
import { HttpError } from '../../core/errors/http-error.js';
import {
  canAuthor,
  canReview,
  editorialDetail,
  listEditorial,
  publishDraft,
  returnDraft,
  saveDraft,
  submitReview,
} from './content.service.js';
export function createContentRouter() {
  const router = Router();
  router.use(requireAuth);
  router.get('/me', (req, res) =>
    res.json({ canAuthor: canAuthor(req.principal!), canReview: canReview(req.principal!) }),
  );
  router.use((req, _res, next) =>
    canAuthor(req.principal!) || canReview(req.principal!)
      ? next()
      : next(new HttpError(403, 'Content staff access required', 'forbidden')),
  );
  router.get('/lessons', async (_req, res) => res.json({ data: await listEditorial() }));
  router.get('/lessons/:id', async (req, res) =>
    res.json({ data: await editorialDetail(String(req.params.id)) }),
  );
  router.post('/lessons/:id/draft', validateBody(reviewedContentSchema), async (req, res) => {
    if (!canAuthor(req.principal!))
      throw new HttpError(403, 'Author permission required', 'forbidden');
    res.json({ data: await saveDraft(String(req.params.id), req.principal!.id, req.body) });
  });
  router.post('/lessons/:id/review', async (req, res) => {
    if (!canAuthor(req.principal!))
      throw new HttpError(403, 'Author permission required', 'forbidden');
    res.json({ data: await submitReview(String(req.params.id), req.principal!.id) });
  });
  router.post('/lessons/:id/return', async (req, res) => {
    if (!canReview(req.principal!))
      throw new HttpError(403, 'Reviewer permission required', 'forbidden');
    res.json({ data: await returnDraft(String(req.params.id), req.principal!.id) });
  });
  router.post('/lessons/:id/publish', async (req, res) => {
    if (!canReview(req.principal!))
      throw new HttpError(403, 'Reviewer permission required', 'forbidden');
    res.json({ data: await publishDraft(String(req.params.id), req.principal!.id) });
  });
  return router;
}
