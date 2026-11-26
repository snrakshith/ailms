import { Queue } from 'bullmq';
import { env } from '../../config/env.js';
import { queueConnection } from './connection.js';
let queue: Queue | undefined;
export function initJobs() {
  if (!env.QUEUE_ENABLED) return;
  queue = new Queue('sapling-events', {
    connection: queueConnection(),
    defaultJobOptions: {
      attempts: 3,
      backoff: { type: 'exponential', delay: 1000 },
      removeOnComplete: 1000,
      removeOnFail: 5000,
    },
  });
}
export async function emitJob(name: string, data: Record<string, unknown>, jobId?: string) {
  if (queue) await queue.add(name, data, { jobId });
}
export async function stopJobs() {
  await queue?.close();
}
