import { Router } from 'express';
import { createTaskSchema, updateTaskSchema } from '@sapling/contracts';
import { validateBody } from '../../core/contracts/validate.js';
import { requireAuth } from '../../infrastructure/security/session.js';
import { list, create, update, remove } from './tasks.controller.js';
export function createTasksRouter() {
  const router = Router();
  router.use(requireAuth);
  router.get('/', list);
  router.post('/', validateBody(createTaskSchema), create);
  router.patch('/:id', validateBody(updateTaskSchema), update);
  router.delete('/:id', remove);
  return router;
}
