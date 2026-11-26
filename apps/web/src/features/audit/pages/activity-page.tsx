import {useQuery} from '@tanstack/react-query';
import {Activity} from 'lucide-react';
import {api} from '../../../core/api/client';
import {Loading} from '../../../shared/components/ui/loading';
import {formatDate} from '../../../shared/utils/format';
import {useDocumentTitle} from '../../../shared/hooks/use-document-title';
type Event={id:string;action:string;entityId:string;at:string};
export function ActivityPage(){
 useDocumentTitle('Activity');
 const {data,isPending,isError,error}=useQuery({queryKey:['audit'],queryFn:()=>api<{data:Event[]}>('/audit')});
 return <><div className="page-header"><div><div className="eyebrow">AUDIT TRAIL</div><h1>Workspace activity</h1><p>Recent recorded changes across your tenant.</p></div></div><section className="panel"><div className="panel-heading"><div><h2>Audit events</h2><p>Latest 50 changes · owner access</p></div><Activity size={20}/></div>{isPending?<Loading/>:isError?<p role="alert" className="form-error">{error.message}</p>:data?.data.length?<ul className="activity-list">{data.data.map(event=><li key={event.id}><span className="timeline-icon"><Activity size={14}/></span><div><strong>{event.action.replace('.',' ')}</strong><small>{event.entityId}</small></div><time>{formatDate(event.at)}</time></li>)}</ul>:<div className="empty-state">No events recorded yet.</div>}</section></>;
}
