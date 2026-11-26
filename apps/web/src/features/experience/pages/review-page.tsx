import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import {Link} from 'react-router-dom';
import {api} from '../../../core/api/client';
import {useDocumentTitle} from '../../../shared/hooks/use-document-title';
import {Loading} from '../../../shared/components/ui/loading';
import {BookOpenCheck,CalendarDays,BrainCircuit} from 'lucide-react';
type Due={lessonId:string;title:string;dueAt:string;intervalDays:number;lastScore:number;repetitions:number};
export function ReviewPage(){useDocumentTitle('Spaced revision');const cache=useQueryClient();
 const feed=useQuery({queryKey:['reviews','due'],queryFn:()=>api<{data:Due[]}>('/reviews/due')});
 const insights=useQuery({queryKey:['reviews','insights'],queryFn:()=>api<{data:{dueCount:number;reviewedCount:number;totalCompleted:number;upcoming:Due[]}}>('/reviews/insights')});
 const mutation=useMutation({mutationFn:({id,rating}:{id:string;rating:string})=>api(`/reviews/${encodeURIComponent(id)}`,{method:'POST',body:JSON.stringify({rating,idempotencyKey:crypto.randomUUID()})}),onSuccess:()=>{void cache.invalidateQueries({queryKey:['reviews']});}});
 if(feed.isPending)return <Loading/>;
 return <div className="aq-page aq-experience"><span className="aq-kicker">P1 · ADAPTIVE LEARNING</span><h1>Spaced revision</h1><p>Small, timely reviews help your new AI concepts stick. Review a lesson, then rate your recall honestly.</p>
 <div className="aq-exp-stats"><div><BrainCircuit/><strong>{insights.data?.data.dueCount??0}</strong><span>Due today</span></div><div><BookOpenCheck/><strong>{insights.data?.data.reviewedCount??0}</strong><span>Revisited</span></div><div><CalendarDays/><strong>{insights.data?.data.totalCompleted??0}</strong><span>Eligible lessons</span></div></div>
 <h2>Ready for revision</h2>{feed.isError&&<p role="alert">{feed.error.message}</p>}{!feed.data?.data.length&&<div className="aq-exp-card"><h3>You're all caught up.</h3><p>New review prompts appear after you master lessons.</p><Link className="aq-primary" to="/paths">Explore lessons</Link></div>}
 <div className="aq-exp-grid">{feed.data?.data.map(item=><article key={item.lessonId} className="aq-exp-card"><h3>{item.title}</h3><p>Last assessed: {item.lastScore}% · Prior reviews: {item.repetitions}</p><Link to={`/learn/${item.lessonId}`} className="aq-text-link">Revisit lesson</Link><div className="aq-rate-row" role="group" aria-label={`Rate your recall of ${item.title}`}>{(['again','hard','good','easy'] as const).map(r=><button key={r} className="aq-outline" disabled={mutation.isPending} onClick={()=>mutation.mutate({id:item.lessonId,rating:r})}>{r}</button>)}</div></article>)}</div>
 {mutation.isError&&<p role="alert" className="aq-error">{mutation.error.message}</p>}
 <h2>Upcoming</h2><div className="aq-exp-card">{insights.data?.data.upcoming.map(v=><p key={v.lessonId}><strong>{v.title}</strong> — {new Date(v.dueAt).toLocaleDateString()}</p>)}{!insights.data?.data.upcoming.length&&<p>Complete a lesson to start your review schedule.</p>}</div>
 </div>;
}
