import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { tasksApi } from '../api/tasks';
export function useTasks() {
  return useQuery({ queryKey: ['tasks'], queryFn: tasksApi.list });
}
export function useTaskActions() {
  const client = useQueryClient();
  const refresh = () => client.invalidateQueries({ queryKey: ['tasks'] });
  return {
    create: useMutation({ mutationFn: tasksApi.create, onSuccess: refresh }),
    update: useMutation({
      mutationFn: ({ id, value }: { id: string; value: Parameters<typeof tasksApi.update>[1] }) =>
        tasksApi.update(id, value),
      onSuccess: refresh,
    }),
    remove: useMutation({ mutationFn: tasksApi.remove, onSuccess: refresh }),
  };
}
