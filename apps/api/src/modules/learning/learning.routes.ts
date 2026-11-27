import { Router } from 'express';
import { submissionSchema } from '@sapling/contracts';
import { validateBody } from '../../core/contracts/validate.js';
import { requireAuth } from '../../infrastructure/security/session.js';
import {
  getLearningLesson,
  getLearningPath,
  getLearningResource,
  learningOverview,
  learningProgress,
  listLearningPaths,
  submitLearningLesson,
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
  router.get('/resources/:id', async (req, res) => {
    const resource = await getLearningResource(req.principal!.id, String(req.params.id));
    res
      .type(resource.kind === 'notebook' ? 'application/x-ipynb+json' : 'text/x-python')
      .attachment(resource.filename)
      .send(resource.source);
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
