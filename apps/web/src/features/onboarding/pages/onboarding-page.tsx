import {useState} from 'react';
import {Navigate} from 'react-router-dom';
import {ArrowRight,BrainCircuit,Code2,Sparkles,Target} from 'lucide-react';
import type {LearnerOnboarding} from '@sapling/contracts';
import {onboardingSchema} from '@sapling/contracts';
import {useAuth} from '../../../core/auth/auth-context';
import {useDocumentTitle} from '../../../shared/hooks/use-document-title';
const goals=[
 {id:'ai-foundations' as const,title:'Build strong AI foundations',detail:'Connect your programming skills to models and data.',icon:<Sparkles size={20}/>},
 {id:'machine-learning' as const,title:'Understand machine learning',detail:'Master training, evaluation and prediction.',icon:<Code2 size={20}/>},
 {id:'genai-engineering' as const,title:'Build GenAI applications',detail:'Prompts, embeddings, retrieval and reliable LLM systems.',icon:<BrainCircuit size={20}/>},
];
export function OnboardingPage(){
 const {user,completeOnboarding}=useAuth();useDocumentTitle('Your learning journey');
 const [form,setForm]=useState<LearnerOnboarding>({background:'frontend',familiarity:'new',goal:'ai-foundations',dailyMinutes:10});
 const [saving,setSaving]=useState(false);const [error,setError]=useState('');
 if(user?.onboarding?.goal)return <Navigate to="/app" replace/>;
 const save=async()=>{const validation=onboardingSchema.safeParse(form);if(!validation.success){setError('Please complete your learner profile.');return;}
 setSaving(true);setError('');try{await completeOnboarding(validation.data);}catch(e){setError(e instanceof Error?e.message:'Could not save preferences');}finally{setSaving(false);}};
 return <div className="aq-onboarding"><div className="aq-onboarding-head"><span className="aq-kicker">YOUR JOURNEY STARTS HERE</span><h1>Build on the developer you already are.</h1><p>A few details help us highlight the right learning path. You can explore every track at your own pace.</p></div>
 <div className="aq-onboarding-panel"><div className="aq-form-group"><label htmlFor="background">What's your development background?</label><select id="background" value={form.background} onChange={e=>setForm(v=>({...v,background:e.target.value as LearnerOnboarding['background']}))}><option value="frontend">Frontend / UI developer</option><option value="backend">Backend developer</option><option value="fullstack">Full-stack developer</option><option value="other">Other / just getting started</option></select></div>
 <div className="aq-form-group"><label htmlFor="familiarity">How familiar are you with AI?</label><select id="familiarity" value={form.familiarity} onChange={e=>setForm(v=>({...v,familiarity:e.target.value as LearnerOnboarding['familiarity']}))}><option value="new">New to AI / ML</option><option value="exploring">I've experimented with AI tools</option><option value="experienced">I have built something with AI</option></select></div>
 <div className="aq-form-group"><div className="aq-label"><Target size={18}/> Choose your first destination</div><div className="aq-goal-options">{goals.map(goal=><button key={goal.id} type="button" aria-pressed={form.goal===goal.id} className={`aq-goal ${form.goal===goal.id?'aq-goal-active':''}`} onClick={()=>setForm(v=>({...v,goal:goal.id}))}><span className="aq-goal-icon">{goal.icon}</span><span><strong>{goal.title}</strong><small>{goal.detail}</small></span><span className="aq-choice-indicator"/></button>)}</div></div>
 <div className="aq-form-group"><div className="aq-label">Daily learning goal</div><div className="aq-time-options">{([10,20,30] as const).map(min=><button key={min} type="button" aria-pressed={form.dailyMinutes===min} className={form.dailyMinutes===min?'aq-time-active':''} onClick={()=>setForm(v=>({...v,dailyMinutes:min}))}>{min} min/day</button>)}</div></div>
 {error&&<p className="aq-error" role="alert">{error}</p>}<button className="aq-primary aq-start-btn" disabled={saving} onClick={save}>{saving?'Creating your journey…':'Explore my learning journey'} <ArrowRight size={18}/></button></div></div>;
}
