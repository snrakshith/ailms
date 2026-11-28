import type { Task, TaskStatus } from '@sapling/contracts';
import { Trash2, Inbox } from 'lucide-react';
import { useTaskActions } from '../hooks/use-tasks';
import { formatDate } from '../../../shared/utils/format';
import { useLocale } from '../../../core/i18n/locale';

const statuses: { value: TaskStatus; label: string }[] = [
  { value: 'todo', label: 'To do' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'done', label: 'Done' },
];
export function TaskTable({ tasks }: { tasks: Task[] }) {
  const { update, remove } = useTaskActions();
  const { t } = useLocale();
  if (!tasks.length)
    return (
      <div className="empty-state">
        <Inbox size={32} />
        <h3>Nothing here yet</h3>
        <p>{t('empty')}</p>
      </div>
    );
  return (
    <div className="table-scroll">
      <table className="task-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>{t('status')}</th>
            <th>Created</th>
            <th>
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>
                <span className="task-title">{task.title}</span>
                <span className="task-description">{task.description || 'No description'}</span>
              </td>
              <td>
                <select
                  className={`status-select status-${task.status}`}
                  aria-label={`Status for ${task.title}`}
                  value={task.status}
                  disabled={update.isPending}
                  onChange={(e) =>
                    update.mutate({ id: task.id, value: { status: e.target.value as TaskStatus } })
                  }
                >
                  {statuses.map((s) => (
                    <option value={s.value} key={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </td>
              <td className="date-cell">{formatDate(task.createdAt)}</td>
              <td>
                <button
                  className="icon-button delete-button"
                  aria-label={`Delete ${task.title}`}
                  disabled={remove.isPending}
                  onClick={() => {
                    if (window.confirm(`Delete "${task.title}"?`)) remove.mutate(task.id);
                  }}
                >
                  <Trash2 size={17} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {(remove.isError || update.isError) && (
        <p className="form-error" role="alert">
          {(remove.error || update.error)?.message}
        </p>
      )}
    </div>
  );
}
