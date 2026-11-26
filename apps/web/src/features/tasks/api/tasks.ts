import type {Task,TaskList,CreateTaskInput,UpdateTaskInput} from '@sapling/contracts';
import {api} from '../../../core/api/client';
export const tasksApi={
 list:()=>api<TaskList>('/tasks?limit=100'),
 create:(value:CreateTaskInput)=>api<{data:Task}>('/tasks',{method:'POST',body:JSON.stringify(value)}),
 update:(id:string,value:UpdateTaskInput)=>api<{data:Task}>(`/tasks/${encodeURIComponent(id)}`,{method:'PATCH',body:JSON.stringify(value)}),
 remove:(id:string)=>api<void>(`/tasks/${encodeURIComponent(id)}`,{method:'DELETE'}),
};
