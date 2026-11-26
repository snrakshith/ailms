import {useMutation,useQuery,useQueryClient} from '@tanstack/react-query';
import type {SubmissionInput} from '@sapling/contracts';
import {createAiQuestClient} from '@aiquest/client-sdk';
import {api} from '../../../core/api/client';

const sharedClient=createAiQuestClient({request:<T>(path:string,init?:{method?:'GET'|'POST'|'PUT'|'DELETE';body?:unknown}):Promise<T>=>api<T>(path,{method:init?.method,body:init?.body===undefined?undefined:JSON.stringify(init.body)})});
const keys={overview:['learning','overview'],paths:['learning','paths'],path:(id:string)=>['learning','path',id],lesson:(id:string)=>['learning','lesson',id]};
export function useLearningOverview(){return useQuery({queryKey:keys.overview,queryFn:()=>sharedClient.overview()});}
export function useLearningPaths(){return useQuery({queryKey:keys.paths,queryFn:()=>sharedClient.paths()});}
export function useLearningPath(id:string){return useQuery({queryKey:keys.path(id),queryFn:()=>sharedClient.path(id)});}
export function useLearningLesson(id:string){return useQuery({queryKey:keys.lesson(id),queryFn:()=>sharedClient.lesson(id)});}
export function useSubmitLesson(lessonId:string){
 const cache=useQueryClient();
 return useMutation({mutationFn:(input:SubmissionInput)=>sharedClient.submit(lessonId,input),
  onSuccess:()=>{void Promise.all([cache.invalidateQueries({queryKey:['learning','overview']}),cache.invalidateQueries({queryKey:['learning','paths']}),cache.invalidateQueries({queryKey:['learning','path']}),cache.invalidateQueries({queryKey:['learning','lesson']})]);}});
}
