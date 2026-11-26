import { createAiQuestClient } from '@aiquest/client-sdk';
import { api } from '../../core/api/client';
export const billingClient = createAiQuestClient({
  request: <T>(
    path: string,
    init?: { method?: 'GET' | 'POST' | 'PUT' | 'DELETE'; body?: unknown },
  ): Promise<T> =>
    api<T>(path, {
      method: init?.method,
      body: init?.body === undefined ? undefined : JSON.stringify(init.body),
    }),
});
