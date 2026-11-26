import {useEffect,useRef,useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {createTaskSchema} from '@sapling/contracts';
import type {z} from 'zod';
import type {CreateTaskInput} from '@sapling/contracts';
import {Plus,X} from 'lucide-react';
import {Button} from '../../../shared/components/ui/button';
import {useTaskActions} from '../hooks/use-tasks';

export function TaskForm(){
 const [open,setOpen]=useState(false);const dialogRef=useRef<HTMLElement>(null);const {create}=useTaskActions();
 useEffect(()=>{
  if(!open)return;
  const previous=document.activeElement instanceof HTMLElement?document.activeElement:null;
  const onKeyDown=(event:KeyboardEvent)=>{
   if(event.key==='Escape'){event.preventDefault();setOpen(false);return;}
   if(event.key!=='Tab')return;
   const nodes=Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),a[href]')??[]);
   if(!nodes.length)return;
   const first=nodes[0],last=nodes[nodes.length-1];
   if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
   else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  };
  document.addEventListener('keydown',onKeyDown);
  return()=>{document.removeEventListener('keydown',onKeyDown);previous?.focus();};
 },[open]);
 const form=useForm<CreateTaskInput, unknown, z.output<typeof createTaskSchema>>({resolver:zodResolver(createTaskSchema),defaultValues:{title:'',description:'',status:'todo'}});
 const submit=form.handleSubmit(async value=>{try{await create.mutateAsync(value);form.reset();setOpen(false);}catch{/* error below */}});
 if(!open)return <Button onClick={()=>setOpen(true)}><Plus size={16}/> New task</Button>;
 return <div className="modal-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setOpen(false);}}><section ref={dialogRef} className="dialog" role="dialog" aria-modal="true" aria-labelledby="create-heading"><div className="dialog-header"><h2 id="create-heading">Create a new task</h2><button className="icon-button" aria-label="Close" onClick={()=>setOpen(false)}><X size={18}/></button></div><form onSubmit={submit} noValidate><label>Title<input autoFocus placeholder="What needs to get done?" {...form.register('title')}/><small>{form.formState.errors.title?.message}</small></label><label>Description<textarea rows={3} placeholder="Add some context (optional)" {...form.register('description')}/></label><label>Status<select {...form.register('status')}><option value="todo">To do</option><option value="in_progress">In progress</option><option value="done">Done</option></select></label>{create.isError&&<p role="alert" className="form-error">{create.error.message}</p>}<div className="dialog-actions"><Button type="button" variant="secondary" onClick={()=>setOpen(false)}>Cancel</Button><Button type="submit" disabled={create.isPending}>{create.isPending?'Creating...':'Create task'}</Button></div></form></section></div>;
}
