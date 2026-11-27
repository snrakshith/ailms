import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
  Flashcard,
  FlashcardReviewInput,
  LibraryResource,
  SubmissionInput,
} from '@sapling/contracts';
import { createAiQuestClient } from '@aiquest/client-sdk';
import { api } from '../../../core/api/client';

const sharedClient = createAiQuestClient({
  request: <T>(
    path: string,
    init?: { method?: 'GET' | 'POST' | 'PUT' | 'DELETE'; body?: unknown },
  ): Promise<T> =>
    api<T>(path, {
      method: init?.method,
      body: init?.body === undefined ? undefined : JSON.stringify(init.body),
    }),
});
const keys = {
  overview: ['learning', 'overview'],
  paths: ['learning', 'paths'],
  path: (id: string) => ['learning', 'path', id],
  lesson: (id: string) => ['learning', 'lesson', id],
  resources: ['learning', 'resources'],
  flashcards: ['learning', 'flashcards'],
};
export function useLearningOverview() {
  return useQuery({ queryKey: keys.overview, queryFn: () => sharedClient.overview() });
}
export function useDueFlashcards() {
  return useQuery({
    queryKey: keys.flashcards,
    queryFn: () => api<{ data: Flashcard[] }>('/learning/flashcards'),
  });
}
export function useReviewFlashcard() {
  const cache = useQueryClient();
  return useMutation({
    mutationFn: ({ id, rating }: { id: string; rating: FlashcardReviewInput['rating'] }) =>
      api(`/learning/flashcards/${encodeURIComponent(id)}/review`, {
        method: 'POST',
        body: JSON.stringify({ rating }),
      }),
    onSuccess: () => void cache.invalidateQueries({ queryKey: keys.flashcards }),
  });
}
export function useLearningPaths() {
  return useQuery({ queryKey: keys.paths, queryFn: () => sharedClient.paths() });
}
export function useLearningPath(id: string) {
  return useQuery({ queryKey: keys.path(id), queryFn: () => sharedClient.path(id) });
}
export function useLearningLesson(id: string) {
  return useQuery({ queryKey: keys.lesson(id), queryFn: () => sharedClient.lesson(id) });
}
export function useLearningResources() {
  return useQuery({
    queryKey: keys.resources,
    queryFn: () => api<{ data: LibraryResource[] }>('/learning/resources'),
  });
}
export function useSubmitLesson(lessonId: string) {
  const cache = useQueryClient();
  return useMutation({
    mutationFn: (input: SubmissionInput) => sharedClient.submit(lessonId, input),
    onSuccess: () => {
      void Promise.all([
        cache.invalidateQueries({ queryKey: ['learning', 'overview'] }),
        cache.invalidateQueries({ queryKey: ['learning', 'paths'] }),
        cache.invalidateQueries({ queryKey: ['learning', 'path'] }),
        cache.invalidateQueries({ queryKey: ['learning', 'lesson'] }),
      ]);
    },
  });
}
