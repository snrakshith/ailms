import { useState } from 'react';
import type { TaskStatus } from '@sapling/contracts';
import { useTasks } from '../hooks/use-tasks';
import { TaskForm } from '../components/task-form';
import { TaskTable } from '../components/task-table';
import { Loading } from '../../../shared/components/ui/loading';
import { useDocumentTitle } from '../../../shared/hooks/use-document-title';
export function TasksPage() {
  const { data, isPending, isError, error } = useTasks();
  const [filter, setFilter] = useState<'all' | TaskStatus>('all');
  useDocumentTitle('Tasks');
  const rows = (data?.data ?? []).filter((t) => filter === 'all' || t.status === filter);
  return (
    <>
      <div className="page-header">
        <div>
          <div className="eyebrow">WORK MANAGEMENT</div>
          <h1>All tasks</h1>
          <p>Organize and track work across your workspace.</p>
        </div>
        <TaskForm />
      </div>
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Task list</h2>
            <p>{rows.length} displayed</p>
          </div>
          <label className="filter-label">
            Filter{' '}
            <select value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)}>
              <option value="all">All statuses</option>
              <option value="todo">To do</option>
              <option value="in_progress">In progress</option>
              <option value="done">Done</option>
            </select>
          </label>
        </div>
        {isPending ? (
          <Loading />
        ) : isError ? (
          <p role="alert" className="form-error">
            {error.message}
          </p>
        ) : (
          <TaskTable tasks={rows} />
        )}
      </section>
    </>
  );
}
