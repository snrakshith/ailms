import {useRef,useState} from 'react';
import {Link} from 'react-router-dom';
import {useMutation,useQuery,useQueryClient} from '@tanstack/react-query';
import {ArrowLeft,Check,LockKeyhole,ReceiptText,ShieldCheck} from 'lucide-react';
import {useDocumentTitle} from '../../shared/hooks/use-document-title';
import {billingClient} from './billing-client';
import {startCashfreeCheckout} from './cashfree-checkout';
import {config} from '../../config/env';
import {track} from '../../core/analytics/analytics';

const money=(paise:number)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(paise/100);
const statuses:Record<string,string>={creating:'Preparing checkout',pending:'Pending payment',paid:'Paid',expired:'Expired',failed:'Failed'};
export function BillingPage(){
 useDocumentTitle('Learning pass & billing');const cache=useQueryClient();const key=useRef(crypto.randomUUID());
 const [phone,setPhone]=useState('');const [checkoutError,setCheckoutError]=useState('');
 const billing=useQuery({queryKey:['billing'],queryFn:()=>billingClient.billing()});
 const purchase=useMutation({mutationFn:async()=>{
  if(!/^[6-9]\d{9}$/.test(phone))throw new Error('Enter a valid 10-digit Indian mobile number.');
  track('checkout_started',{product:'genai-track-pass'});
  const result=await billingClient.checkout({productId:'genai-track-pass',idempotencyKey:key.current,customerPhone:phone});
  await startCashfreeCheckout(result.data.paymentSessionId,result.data.environment);
  key.current=crypto.randomUUID(); // future orders must use a new idempotency key
 },onError:(error)=>setCheckoutError(error.message),onSuccess:()=>{void cache.invalidateQueries({queryKey:['billing']});}});
 const product=billing.data?.data.product;
 return <div className="aq-page aq-billing"><Link className="aq-back" to="/paths"><ArrowLeft size={16}/> Learning paths</Link>
 <header className="aq-page-heading"><span className="aq-kicker">YOUR LEARNING INVESTMENT</span><h1>Access advanced GenAI learning.</h1>
 <p>One clear price. No subscription. Build on your developer experience with practical generative AI lessons.</p></header>
 {billing.isPending&&<p role="status">Loading access details…</p>}
 {billing.isError&&<p role="alert" className="aq-error">{billing.error.message}</p>}
 {product&&<section className="aq-billing-card"><div className="aq-billing-main"><div className="aq-billing-icon"><LockKeyhole size={21}/></div>
 <span className="aq-kicker">ONE-TIME LEARNING PASS</span><h2>{product.title}</h2>
 <p>{product.description}</p><ul className="aq-billing-benefits"><li><Check size={17}/> Full Generative AI track</li><li><Check size={17}/> Hands-on assessments and progress</li><li><Check size={17}/> Lifetime access to the current learning track</li></ul></div>
 <div className="aq-billing-checkout"><span className="aq-kicker">TOTAL</span><strong className="aq-billing-price">{money(product.amountPaise)}</strong><small>INR · One-time purchase</small>
 {product.owned?<div className="aq-billing-owned"><ShieldCheck size={21}/> Your pass is active. <Link to="/paths/genai-engineering">Start learning</Link></div>:<>
 <label className="aq-field">Mobile number for payment verification<input type="tel" autoComplete="tel-national" inputMode="numeric" value={phone} maxLength={10} placeholder="10-digit mobile number" onChange={e=>{setPhone(e.target.value.replace(/\D/g,''));setCheckoutError('');}}/></label>
 <button className="aq-primary aq-billing-buy" disabled={!billing.data?.data.enabled||purchase.isPending||phone.length!==10} onClick={()=>{setCheckoutError('');purchase.mutate();}}>
 <ShieldCheck size={17}/>{purchase.isPending?'Connecting securely…':'Continue to secure checkout'}</button>
 {!billing.data?.data.enabled&&<p className="aq-billing-muted">Checkout is not configured in this environment.</p>}
 {checkoutError&&<p role="alert" className="aq-error">{checkoutError}</p>}
 <p className="aq-billing-muted">Payments are processed by Cashfree. AI Quest does not collect or store card details. Access is activated only after server verification.</p>
 </>}</div></section>}
 <section className="aq-billing-history"><h2><ReceiptText size={19}/> Payment history</h2>
 {billing.data?.data.orders.length?<div className="aq-billing-orders">{billing.data.data.orders.map(order=><div key={order.orderId} className="aq-billing-order">
 <span><strong>{money(order.amountPaise)}</strong><small>{order.createdAt?new Date(order.createdAt).toLocaleDateString('en-IN'):'Recent purchase'}</small></span><span className="aq-pill">{statuses[order.status]??order.status}</span><Link to={`/billing/return?order_id=${encodeURIComponent(order.orderId)}`}>Details</Link>{order.status==='paid'&&<a href={`${config.apiBase}/billing/orders/${encodeURIComponent(order.orderId)}/invoice`}>Download receipt (PDF)</a>}</div>)}</div>:<p className="aq-muted">No purchases yet. Free courses remain available without payment.</p>}
 </section></div>;
}
