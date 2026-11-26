import {PublicLayout} from '../components/public-layout';
import {siteContent} from '../content/site-content';
import {useDocumentTitle} from '../../../shared/hooks/use-document-title';
export function FaqList({items}:{items:readonly {question:string;answer:string}[]}){
 return <div className="mkt-faq-list">{items.map(item=><details key={item.question} className="mkt-faq-item"><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div>;
}
export function FaqPage(){useDocumentTitle('Frequently asked questions','Answers about courses, pricing, account access and learning with AI Quest.');return <PublicLayout><section className="mkt-inner-hero mkt-container"><span className="mkt-eyebrow">HELPFUL ANSWERS</span><h1>Frequently asked questions.</h1><p>Everything you need to know about learning with AI Quest.</p></section><section className="mkt-container mkt-inner-body"><FaqList items={siteContent.faqs}/></section></PublicLayout>;}
