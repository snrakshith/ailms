import { Link } from 'react-router-dom';
import { Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { PublicLayout } from '../components/public-layout';
import { siteContent } from '../content/site-content';
import { useDocumentTitle } from '../../../shared/hooks/use-document-title';
import { FaqList } from './faq-page';
export function PricingPage() {
  useDocumentTitle('Pricing and learning pass', siteContent.pricing.description);
  const { pricing, faqs } = siteContent;
  return (
    <PublicLayout>
      <section className="mkt-inner-hero mkt-container">
        <span className="mkt-eyebrow">{pricing.eyebrow}</span>
        <h1>{pricing.title}</h1>
        <p>{pricing.description}</p>
      </section>
      <div className="mkt-container mkt-pricing-grid">
        {pricing.plans.map((plan) => (
          <article
            key={plan.id}
            className={`mkt-price-card ${plan.featured ? 'mkt-price-featured' : ''}`}
          >
            {plan.featured && <div className="mkt-plan-highlight">FOR YOUR NEXT CHAPTER</div>}
            <div className="mkt-plan-name">{plan.name}</div>
            <div className="mkt-plan-price">
              {plan.price}
              <span>{plan.period}</span>
            </div>
            <p>{plan.description}</p>
            <Link
              className={`mkt-button ${plan.featured ? 'mkt-button-dark' : 'mkt-button-outline'}`}
              to={plan.to}
            >
              {plan.cta}
              <ArrowRight size={17} />
            </Link>
            <div className="mkt-plan-divider" />
            <h3>What's included</h3>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Check size={17} />
                  {feature}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="mkt-container mkt-price-note">
        <ShieldCheck size={18} />
        {pricing.footnote}
      </div>
      <section className="mkt-section mkt-container mkt-faq-layout">
        <div>
          <span className="mkt-eyebrow">QUESTIONS</span>
          <h2>Before you commit.</h2>
          <p>Start free and choose your next step when you are ready.</p>
        </div>
        <FaqList items={faqs.filter((_, i) => [1, 3, 5].includes(i))} />
      </section>
    </PublicLayout>
  );
}
