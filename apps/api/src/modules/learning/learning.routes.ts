import { Router } from 'express';
import { flashcardReviewSchema, submissionSchema } from '@sapling/contracts';
import { validateBody } from '../../core/contracts/validate.js';
import { requireAuth } from '../../infrastructure/security/session.js';
import {
  getLearningLesson,
  getLearningPath,
  getLearningResource,
  dueFlashcards,
  listLearningResources,
  learningOverview,
  learningProgress,
  listLearningPaths,
  submitLearningLesson,
  reviewFlashcard,
} from './learning.service.js';

export function createLearningRouter() {
  const router = Router();
  router.use(requireAuth);
  router.get('/overview', async (req, res) => {
    res.json(await learningOverview(req.principal!));
  });
  router.get('/progress', async (req, res) => {
    res.json(await learningProgress(req.principal!.id));
  });
  router.get('/paths', async (req, res) => {
    res.json({ data: await listLearningPaths(req.principal!.id) });
  });
  router.get('/paths/:id', async (req, res) => {
    res.json({ data: await getLearningPath(req.principal!.id, String(req.params.id)) });
  });
  router.get('/resources', async (req, res) => {
    res.json({ data: await listLearningResources(req.principal!.id) });
  });
  router.get('/flashcards', async (req, res) => {
    res.json({ data: await dueFlashcards(req.principal!.id) });
  });
  router.post('/flashcards/:id/review', validateBody(flashcardReviewSchema), async (req, res) => {
    await reviewFlashcard(req.principal!.id, String(req.params.id), req.body);
    res.status(204).end();
  });
  router.get('/resources/:id/view', async (req, res) => {
    const resource = await getLearningResource(req.principal!.id, String(req.params.id));
    if (resource.kind !== 'visualization' && resource.kind !== 'diagram')
      return res.status(415).json({ error: 'Inline preview is unavailable for this resource' });
    res.set(
      'Content-Security-Policy',
      "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; connect-src 'none'; form-action 'none'",
    );
    res.type(resource.kind === 'diagram' ? 'image/svg+xml' : 'text/html').send(resource.source);
  });
  router.get('/resources/:id', async (req, res) => {
    const resource = await getLearningResource(req.principal!.id, String(req.params.id));
    const contentType =
      resource.kind === 'notebook'
        ? 'application/x-ipynb+json'
        : resource.filename.endsWith('.svg')
          ? 'image/svg+xml'
          : resource.filename.endsWith('.html')
            ? 'text/html'
            : resource.filename.endsWith('.json')
              ? 'application/json'
              : resource.filename.endsWith('.csv')
                ? 'text/csv'
                : resource.filename.endsWith('.tsv')
                  ? 'text/tab-separated-values'
                  : resource.filename.endsWith('.md')
                    ? 'text/markdown'
                    : 'text/plain';
    res.type(contentType).attachment(resource.filename).send(resource.source);
  });
  router.get('/lessons/:id', async (req, res) => {
    res.json({ data: await getLearningLesson(req.principal!.id, String(req.params.id)) });
  });
  router.post('/lessons/:id/submit', validateBody(submissionSchema), async (req, res) => {
    res.json({
      data: await submitLearningLesson(req.principal!.id, String(req.params.id), req.body),
    });
  });
  return router;
}
