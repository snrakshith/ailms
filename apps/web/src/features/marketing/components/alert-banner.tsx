import {useState} from 'react';
import {Link} from 'react-router-dom';
import {X} from 'lucide-react';
import {siteContent} from '../content/site-content';
export function AlertBanner(){
 const {alert}=siteContent;
 const [dismissed,setDismissed]=useState(()=>{try{return sessionStorage.getItem(`alert:${alert.id}`)==='dismissed';}catch{return false;}});
 if(!alert.enabled||dismissed)return null;
 return <div role="status" className="aq-alert-banner"><span><strong>{alert.label}</strong> {alert.message} <Link to={alert.href}>Learn more</Link></span><button aria-label="Dismiss announcement" onClick={()=>{setDismissed(true);try{sessionStorage.setItem(`alert:${alert.id}`,'dismissed');}catch{/* private mode */}}}><X size={15}/></button></div>;
}
