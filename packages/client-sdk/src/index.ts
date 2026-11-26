/** Portable fetch-based SDK: React, React Native, or Node can inject a transport. */
import type {BillingOverview,CheckoutInput,CheckoutSession,PaymentOrder,LearningOverview,LearningPath,LessonDetail,SubmissionInput,SubmissionResult,ReviewDue,ReviewInsights,LabChallenge,TutorHintResponse,CapstoneProject,ProjectInput,TextComparison,ModelComparison,ReviewedContent,StaffPermission} from '@sapling/contracts';
export type ApiTransport={request<T>(path:string,init?:{method?:'GET'|'POST'|'PUT'|'DELETE';body?:unknown}):Promise<T>};
const enc=encodeURIComponent;
export function createAiQuestClient(transport:ApiTransport){
 const get=<T>(url:string)=>transport.request<T>(url);
 const post=<T>(url:string,body:unknown)=>transport.request<T>(url,{method:'POST',body});
 return {
  nativeLogin:(email:string,password:string)=>post<{user:{id:string;name:string};accessToken:string;expiresInSeconds:number;refreshToken:string}>('/native-auth/login',{email,password}),
  nativeGoogleLogin:(credential:string)=>post<{user:{id:string;name:string};accessToken:string;expiresInSeconds:number;refreshToken:string}>('/native-auth/google',{credential}),
  nativeRegister:(name:string,email:string,password:string)=>post<{user:{id:string;name:string};accessToken:string;expiresInSeconds:number;refreshToken:string}>('/native-auth/register',{name,email,password}),
  nativeRefresh:(refreshToken:string)=>post<{accessToken:string;expiresInSeconds:number;refreshToken:string}>('/native-auth/refresh',{refreshToken}),
  nativeLogout:(refreshToken:string)=>post<void>('/native-auth/logout',{refreshToken}),
  billing:()=>get<{data:BillingOverview}>('/billing/me'),
  checkout:(input:CheckoutInput)=>post<{data:CheckoutSession}>('/billing/orders',input),
  paymentOrder:(id:string)=>get<{data:PaymentOrder}>(`/billing/orders/${enc(id)}`),
  verifyPayment:(id:string)=>post<{data:PaymentOrder}>(`/billing/orders/${enc(id)}/verify`,{}),
  overview:()=>get<LearningOverview>('/learning/overview'),
  paths:()=>get<{data:LearningPath[]}>('/learning/paths'),
  path:(id:string)=>get<{data:LearningPath}>(`/learning/paths/${enc(id)}`),
  lesson:(id:string)=>get<{data:LessonDetail}>(`/learning/lessons/${enc(id)}`),
  submit:(id:string,body:SubmissionInput)=>post<{data:SubmissionResult}>(`/learning/lessons/${enc(id)}/submit`,body),
  dueReviews:()=>get<{data:ReviewDue[]}>('/reviews/due'),
  reviewInsights:()=>get<{data:ReviewInsights}>('/reviews/insights'),
  rateReview:(lessonId:string,rating:'again'|'hard'|'good'|'easy',idempotencyKey:string)=>post<{data:{lessonId:string;dueAt:string;rating:string}}>(`/reviews/${enc(lessonId)}`,{rating,idempotencyKey}),
  hint:(lessonId:string,question:string,stage:number)=>post<{data:TutorHintResponse}>('/tutor/hints',{lessonId,question,stage}),
  tutorQuota:()=>get<{data:{used:number;limit:number;modelTokens:number;remaining:number}}>('/tutor/quota'),
  challenges:()=>get<{data:LabChallenge[]}>('/labs/challenges'),
  compareText:(a:string,b:string)=>post<{data:TextComparison}>('/labs/compare',{a,b}),
  availableModels:()=>get<{data:{available:boolean;models:string[];dailyLimit:number}}>('/model-playground/models'),
  compareModels:(prompt:string)=>post<{data:ModelComparison}>('/model-playground/compare',{prompt}),
  projects:()=>get<{data:CapstoneProject[]}>('/portfolio/projects'),
  newProject:(input:ProjectInput)=>post<{data:CapstoneProject}>('/portfolio/projects',input),
  updateProject:(id:string,input:ProjectInput)=>transport.request<{data:CapstoneProject}>(`/portfolio/projects/${enc(id)}`,{method:'PUT',body:input}),
  submitProject:(id:string)=>post<{data:CapstoneProject}>(`/portfolio/projects/${enc(id)}/submit`,{}),
  publishProject:(id:string)=>post<{data:CapstoneProject}>(`/portfolio/projects/${enc(id)}/publish`,{}),
  unpublishProject:(id:string)=>post<{data:CapstoneProject}>(`/portfolio/projects/${enc(id)}/unpublish`,{}),
  deleteProject:(id:string)=>transport.request<void>(`/portfolio/projects/${enc(id)}`,{method:'DELETE'}),
  publicShowcase:(slug:string)=>get<{data:CapstoneProject&{verification:string}}>(`/public/portfolio/${enc(slug)}`),
  staffPermission:()=>get<StaffPermission>('/content/me'),
  editorialLesson:(id:string)=>get<{data:unknown}>(`/content/lessons/${enc(id)}`),
  saveDraft:(id:string,input:ReviewedContent)=>post<{data:unknown}>(`/content/lessons/${enc(id)}/draft`,input),
  submitDraftForReview:(id:string)=>post<{data:unknown}>(`/content/lessons/${enc(id)}/review`,{}),
  referrals:()=>get<{data:import('@sapling/contracts').ReferralOverview}>('/referrals/me'),
  invoicePath:(orderId:string)=>`/billing/orders/${enc(orderId)}/invoice`,
  exportData:()=>get<unknown>('/privacy/export'),
 };
}
/** Native apps should pass an authenticated token-aware fetch; web apps may use cookie/CSRF transport. */
export function createFetchTransport(baseUrl:string,fetcher:typeof fetch,headers:()=>Record<string,string> = ()=>({})):ApiTransport {
 return {async request<T>(path:string,init?:{method?:'GET'|'POST'|'PUT'|'DELETE';body?:unknown}){
  const response=await fetcher(`${baseUrl}${path}`,{method:init?.method??'GET',headers:{...headers(),...(init?.body!==undefined?{'content-type':'application/json'}:{})},body:init?.body===undefined?undefined:JSON.stringify(init.body)});
  if(!response.ok)throw new Error(`API request failed: ${response.status}`);
  if(response.status===204)return undefined as T;
  return await response.json() as T;
 }};
}
