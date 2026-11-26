import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {articleBySlug,siteContent} from '../content/site-content';
function setMeta(name:string,value:string,property=false){
 const attribute=property?'property':'name';let el=document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
 if(!el){el=document.createElement('meta');el.setAttribute(attribute,name);document.head.append(el);}el.content=value;
}
export function SeoRouteObserver(){
 const {pathname}=useLocation();
 useEffect(()=>{
  const descriptors:Record<string,[string,string]>= {
   '/':['Learn AI for developers',siteContent.hero.description],
   '/pricing':[siteContent.pricing.title,siteContent.pricing.description],
   '/faq':['Frequently asked questions','Answers about the AI Quest learning paths, pricing and how the platform works.'],
   '/blog':[siteContent.journal.title,siteContent.journal.description],
   '/status':[siteContent.status.title,siteContent.status.description],
  };
  const article=pathname.startsWith('/blog/')?articleBySlug(pathname.slice(6)):undefined;
  const info=article?[article.title,article.description]:descriptors[pathname]??['AI Quest learning app','Develop practical AI engineering skills.'];
  document.title=`${info[0]} · AI Quest`;setMeta('description',info[1]);setMeta('og:title',info[0],true);setMeta('og:description',info[1],true);
  const publicIndexable=Boolean(article||['/','/pricing','/faq','/blog'].includes(pathname));
  setMeta('robots',publicIndexable?'index,follow':'noindex,nofollow');
  const origin=window.location.origin;const url=origin+pathname;
  let canonical=document.head.querySelector<HTMLLinkElement>('link[rel=canonical]');
  if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical);}canonical.href=url;
  setMeta('og:url',url,true);
  return ()=>{};
 },[pathname]);
 return null;
}
