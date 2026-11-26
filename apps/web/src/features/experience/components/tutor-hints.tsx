import {useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {api} from '../../../core/api/client';
import {Sparkles} from 'lucide-react';
export function TutorHints({lessonId}:{lessonId:string}){
 const [question,setQuestion]=useState('Can you explain this concept using an analogy from software engineering?');const [stage,setStage]=useState(1);
 const hints=useMutation({mutationFn:()=>api<{data:{answer:string;provider:string;remaining:number}}>('/tutor/hints',{method:'POST',body:JSON.stringify({lessonId,question,stage}),timeoutMs:12000})});
 return <section className="aq-side-panel aq-tutor-panel"><div className="aq-side-icon"><Sparkles size={19}/></div><h3>AI learning assistant</h3><p>Ask for a progressive hint. Hints guide your reasoning rather than giving quiz answers.</p><label className="aq-field">What is confusing?<textarea maxLength={700} value={question} onChange={e=>setQuestion(e.target.value)}/></label><div className="aq-rate-row">{[1,2,3].map(n=><button key={n} type="button" className={`aq-outline ${stage===n?'aq-tab-active':''}`} onClick={()=>setStage(n)}>Hint {n}</button>)}</div><button className="aq-primary" disabled={!question.trim()||hints.isPending} onClick={()=>hints.mutate()}>{hints.isPending?'Thinking…':'Get a hint'}</button>{hints.data&&<div className="aq-exp-result" role="status"><p>{hints.data.data.answer}</p><small>{hints.data.data.provider} · {hints.data.data.remaining} hints left today</small></div>}{hints.isError&&<p role="alert" className="aq-error">{hints.error.message}</p>}</section>;
}
