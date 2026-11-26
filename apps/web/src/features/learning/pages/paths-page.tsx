import {useLearningPaths} from '../api/learning';
import {PathCard} from '../components/path-card';
import {Loading} from '../../../shared/components/ui/loading';
import {useDocumentTitle} from '../../../shared/hooks/use-document-title';
export function PathsPage(){
 const {data,isPending,error}=useLearningPaths();useDocumentTitle('Learning paths');
 return <div className="aq-page"><header className="aq-page-heading"><span className="aq-kicker">THE LEARNING UNIVERSE</span><h1>Choose what to master.</h1><p>No overwhelming catalog. Just thoughtfully sequenced foundations that connect your developer skills to modern AI engineering.</p></header>
 {isPending?<Loading/>:error?<p role="alert" className="aq-error">{error.message}</p>:<div className="aq-path-grid">{data?.data.map(path=><PathCard key={path.id} path={path}/>)}</div>}
 <div className="aq-note"><strong>Designed for working developers</strong><span>Each path follows one cycle: understand the concept, connect it to software engineering, answer scenario-based questions, and build toward practical application.</span></div></div>;
}
