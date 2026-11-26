import { randomUUID } from 'node:crypto';
import { Router } from 'express';
import { projectSchema } from '@sapling/contracts';
import { validateBody } from '../../core/contracts/validate.js';
import { requireAuth } from '../../infrastructure/security/session.js';
import { HttpError } from '../../core/errors/http-error.js';
import { CapstoneProjectModel } from '../learning/experience.models.js';
function projectId(raw: unknown): string {
  if (typeof raw !== 'string' || !/^[a-f\d]{24}$/i.test(raw))
    throw new HttpError(404, 'Project not found', 'not_found');
  return raw;
}
function serialize(project: Record<string, unknown>) {
  return {
    id: String(project._id),
    slug: project.slug,
    status: project.status,
    title: project.title,
    summary: project.summary,
    repositoryUrl: project.repositoryUrl,
    demoUrl: project.demoUrl,
    track: project.track,
    skills: project.skills,
    reflection: project.reflection,
    publishedAt: project.publishedAt,
    updatedAt: project.updatedAt,
  };
}
export function createPortfolioRouter() {
  const router = Router();
  router.use(requireAuth);
  router.get('/projects', async (req, res) => {
    const data = await CapstoneProjectModel.find({ userId: req.principal!.id })
      .sort({ updatedAt: -1 })
      .lean();
    res.json({ data: data.map((p) => serialize(p)) });
  });
  router.post('/projects', validateBody(projectSchema), async (req, res) => {
    const project = await CapstoneProjectModel.create({
      userId: req.principal!.id,
      slug: randomUUID(),
      status: 'draft',
      ...req.body,
    });
    res.status(201).json({ data: serialize(project.toObject()) });
  });
  router.put('/projects/:id', validateBody(projectSchema), async (req, res) => {
    const project = await CapstoneProjectModel.findOneAndUpdate(
      { _id: projectId(req.params.id), userId: req.principal!.id, status: 'draft' },
      { $set: req.body },
      { new: true, runValidators: true },
    );
    if (!project) throw new HttpError(404, 'Editable project not found', 'not_found');
    res.json({ data: serialize(project.toObject()) });
  });
  router.post('/projects/:id/submit', async (req, res) => {
    const project = await CapstoneProjectModel.findOneAndUpdate(
      { _id: projectId(req.params.id), userId: req.principal!.id, status: 'draft' },
      { $set: { status: 'submitted', submittedAt: new Date() } },
      { new: true },
    );
    if (!project) throw new HttpError(404, 'Draft project not found', 'not_found');
    res.json({ data: serialize(project.toObject()) });
  });
  router.post('/projects/:id/publish', async (req, res) => {
    const project = await CapstoneProjectModel.findOneAndUpdate(
      { _id: projectId(req.params.id), userId: req.principal!.id, status: 'submitted' },
      { $set: { status: 'published', publishedAt: new Date() } },
      { new: true },
    );
    if (!project)
      throw new HttpError(409, 'Submit your project before making it public', 'invalid_status');
    res.json({ data: serialize(project.toObject()) });
  });
  router.post('/projects/:id/unpublish', async (req, res) => {
    const project = await CapstoneProjectModel.findOneAndUpdate(
      { _id: projectId(req.params.id), userId: req.principal!.id, status: 'published' },
      { $set: { status: 'submitted' }, $unset: { publishedAt: 1 } },
      { new: true },
    );
    if (!project) throw new HttpError(409, 'Published project not found', 'invalid_status');
    res.json({ data: serialize(project.toObject()) });
  });
  router.delete('/projects/:id', async (req, res) => {
    const deleted = await CapstoneProjectModel.deleteOne({
      _id: projectId(req.params.id),
      userId: req.principal!.id,
    });
    if (!deleted.deletedCount) throw new HttpError(404, 'Project not found', 'not_found');
    res.status(204).end();
  });
  return router;
}
export function createPublicPortfolioRouter() {
  const router = Router();
  router.get('/:slug', async (req, res) => {
    const project = await CapstoneProjectModel.findOne({
      slug: String(req.params.slug),
      status: 'published',
    }).lean();
    if (!project) throw new HttpError(404, 'Public project not found', 'not_found');
    const { title, summary, track, skills, repositoryUrl, demoUrl, reflection, publishedAt, slug } =
      project;
    res.json({
      data: {
        title,
        summary,
        track,
        skills,
        repositoryUrl,
        demoUrl,
        reflection,
        publishedAt,
        slug,
        verification: 'learner-self-published; not independently graded',
      },
    });
  });
  return router;
}
