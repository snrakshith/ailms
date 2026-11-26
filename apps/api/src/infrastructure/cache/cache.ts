import { Redis } from 'ioredis';
import { env } from '../../config/env.js';
let redis: Redis | undefined;
export async function connectCache() {
  if (!env.CACHE_ENABLED) return;
  redis = new Redis(env.REDIS_URL!, {
    lazyConnect: true,
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
  });
  await redis.connect();
}
export function cacheReady() {
  return !env.CACHE_ENABLED || redis?.status === 'ready';
}
export async function cacheGet<T>(key: string): Promise<T | undefined> {
  const value = await redis?.get(key);
  return value ? (JSON.parse(value) as T) : undefined;
}
export async function cachePut(key: string, value: unknown, seconds = 30) {
  await redis?.set(key, JSON.stringify(value), 'EX', seconds);
}
export async function cacheDelete(key: string) {
  await redis?.del(key);
}
export async function disconnectCache() {
  await redis?.quit();
}

// Increment on mutations so every tenant-scoped paginated list uses a fresh cache key.
export async function taskCacheGeneration(tenantId: string): Promise<string> {
  return (await redis?.get(`tasks-generation:${tenantId}`)) ?? '0';
}
export async function invalidateTenantTasks(tenantId: string): Promise<void> {
  await redis?.incr(`tasks-generation:${tenantId}`);
}
