import {Link,useParams} from 'react-router-dom';
import {ArrowLeft,ArrowRight,BookOpen,CheckCircle2,Clock3,LockKeyhole,Play} from 'lucide-react';
import {useLearningPath} from '../api/learning';
import {PathSymbol} from '../components/path-card';
import {Loading} from '../../../shared/components/ui/loading';
import {useDocumentTitle} from '../../../shared/hooks/use-document-title';
export function PathDetailPage(){
 const {pathId=''}=useParams();const {data,isPending,error}=useLearningPath(pathId);useDocumentTitle('Learning path');
 if(isPending)return <Loading/>;
 if(error||!data)return <div className="aq-page"><p role="alert" className="aq-error">{error?.message??'Path unavailable'}</p><Link to="/paths">Return to paths</Link></div>;
 const path=data.data;const requiresPass=path.requiresPurchase&&!path.purchaseUnlocked;const next=path.lessons?.find(lesson=>lesson.unlocked&&!lesson.completed);
 return <div className="aq-page"><Link to="/paths" className="aq-back"><ArrowLeft size={16}/> All learning paths</Link>
 <div className={`aq-path-hero aq-accent-${path.color}`}><div className="aq-path-hero-icon"><PathSymbol icon={path.icon}/></div><span className="aq-pill">{path.level}</span><h1>{path.title}</h1><p>{path.description}</p><div className="aq-hero-meta"><span><BookOpen size={16}/>{path.lessonCount} lessons</span><span><Clock3 size={16}/>{path.estimatedMinutes} minutes</span><span>{path.progressPercent}% complete</span></div>{requiresPass&&<Link to="/billing" className="aq-primary"><LockKeyhole size={16}/> Unlock this track <ArrowRight size={16}/></Link>}{next&&<Link to={`/learn/${next.id}`} className="aq-primary">{path.completedLessons>0?'Continue learning':'Start learning'} <ArrowRight size={16}/></Link>}</div>
  {requiresPass&&<div className="aq-note"><strong>Available with the GenAI learning pass</strong><span>Explore this roadmap for free. Lessons unlock after successful payment verification. <Link to="/billing">View pass details</Link></span></div>}
 <div className="aq-section-heading"><div><span className="aq-kicker">YOUR ROADMAP</span><h2>Learn one step at a time</h2></div><span className="aq-muted">{path.completedLessons} / {path.lessonCount} complete</span></div>
 <div className="aq-lessons-list">{path.lessons?.map(lesson=><div className={`aq-lesson-row ${!lesson.unlocked?'aq-locked':''}`} key={lesson.id}>
 <span className={`aq-lesson-index ${lesson.completed?'aq-index-done':''}`}>{lesson.completed?<CheckCircle2 size={20}/>:lesson.unlocked?<Play size={17}/>:<LockKeyhole size={16}/>}</span>
 <div><span className="aq-kicker">LESSON {String(lesson.order).padStart(2,'0')} · {lesson.durationMinutes} MIN</span><h3>{lesson.title}</h3><p>{lesson.description}</p></div>
 <span className="aq-lesson-xp">+{lesson.xp} XP</span>
 {lesson.unlocked?<Link to={`/learn/${lesson.id}`} className="aq-outline">{lesson.completed?'Review':'Learn'} <ArrowRight size={15}/></Link>:<span className="aq-muted aq-locked-label">Locked</span>}
 </div>)}</div></div>;
}
