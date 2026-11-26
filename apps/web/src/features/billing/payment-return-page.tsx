import {useCallback,useEffect,useState} from 'react';
import {Link,useSearchParams} from 'react-router-dom';
import {CheckCircle2,Clock3,ShieldAlert} from 'lucide-react';
import {billingClient} from './billing-client';
import {useDocumentTitle} from '../../shared/hooks/use-document-title';
import type {PaymentOrder} from '@sapling/contracts';
export function PaymentReturnPage(){
 useDocumentTitle('Payment status');const [params]=useSearchParams();const id=params.get('order_id')??'';
 const [order,setOrder]=useState<PaymentOrder|null>(null);const [error,setError]=useState('');const [busy,setBusy]=useState(false);
 const verify=useCallback(async()=>{if(!/^aq_[a-f0-9]{32}$/.test(id)){setError('Invalid order reference.');return;}
  setBusy(true);setError('');try{const result=await billingClient.verifyPayment(id);setOrder(result.data);}catch(e){setError(e instanceof Error?e.message:'Could not verify payment');}finally{setBusy(false);}},[id]);
 useEffect(()=>{void verify();},[verify]);
 return <div className="aq-page aq-billing"><Link className="aq-back" to="/billing">Back to billing</Link>
 <div className="aq-billing-result">{order?.status==='paid'?<CheckCircle2 size={35}/>:order?.status==='expired'||order?.status==='failed'?<ShieldAlert size={35}/>:<Clock3 size={35}/>}
 <h1>{order?.status==='paid'?'Payment verified':order?.status==='expired'?'Order expired':'Confirming payment status'}</h1>
 <p>{order?.status==='paid'?'Your GenAI Engineering Pass is active. You can open the learning path now.':
 'Your access is not yet confirmed. Payments may take time to settle; never retry a payment based only on this screen.'}</p>
 {id&&<div className="aq-billing-ref">Order ID: <code>{id}</code></div>}
 {error&&<p role="alert" className="aq-error">{error}</p>}
 <div className="aq-rate-row">{order?.status==='paid'?<Link to="/paths/genai-engineering" className="aq-primary">Start learning</Link>:<button disabled={busy} className="aq-primary" onClick={()=>{void verify();}}>{busy?'Checking…':'Check status again'}</button>}
 <Link className="aq-outline" to="/billing">Billing overview</Link></div></div></div>;
}
