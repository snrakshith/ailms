import mongoose from 'mongoose';
import { TaskModel } from '../../infrastructure/database/mongodb/models.js';
import type { CreateTaskInput, Task, TaskList, TaskStatus } from '@sapling/contracts';
import { HttpError } from '../../core/errors/http-error.js';

function serializeTask(record: {
  _id: unknown;
  title: string;
  description: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}): Task {
  return {
    id: String(record._id),
    title: record.title,
    description: record.description,
    status: record.status as TaskStatus,
    createdAt: (record.createdAt ?? new Date()).toISOString(),
    updatedAt: (record.updatedAt ?? new Date()).toISOString(),
  };
}
export async function listTasks(
  tenantId: string,
  query: { cursor?: string; limit: number; status?: TaskStatus },
): Promise<TaskList> {
  const filter: Record<string, unknown> = { tenantId };
  if (query.status) filter.status = query.status;
  if (query.cursor) filter._id = { $lt: new mongoose.Types.ObjectId(query.cursor) };
  const rows = await TaskModel.find(filter)
    .sort({ _id: -1 })
    .limit(query.limit + 1)
    .lean();
  const hasMore = rows.length > query.limit;
  const items = rows.slice(0, query.limit).map(serializeTask);
  return { data: items, nextCursor: hasMore ? String(rows[query.limit - 1]._id) : null };
}
export async function insertTask(
  tenantId: string,
  userId: string,
  input: CreateTaskInput,
): Promise<Task> {
  const created = await TaskModel.create({ ...input, tenantId, createdBy: userId });
  return serializeTask(created);
}
export async function updateTask(
  tenantId: string,
  id: string,
  changes: Record<string, unknown>,
): Promise<Task> {
  if (!mongoose.isValidObjectId(id)) throw new HttpError(404, 'Task not found', 'not_found');
  const row = await TaskModel.findOneAndUpdate(
    { _id: id, tenantId },
    { $set: changes },
    { new: true, runValidators: true },
  );
  if (!row) throw new HttpError(404, 'Task not found', 'not_found');
  return serializeTask(row);
}
export async function deleteTask(tenantId: string, id: string): Promise<void> {
  if (!mongoose.isValidObjectId(id)) throw new HttpError(404, 'Task not found', 'not_found');
  const deleted = await TaskModel.findOneAndDelete({ _id: id, tenantId });
  if (!deleted) throw new HttpError(404, 'Task not found', 'not_found');
}
