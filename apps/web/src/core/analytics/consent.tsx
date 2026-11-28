import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../auth/auth-context';
import {
  analyticsConsent,
  identifyLearner,
  initAnalytics,
  setAnalyticsConsent,
  track,
} from './analytics';
export function AnalyticsObserver() {
  const location = useLocation();
  const { user } = useAuth();
  useEffect(() => {
    initAnalytics();
  }, []);
  useEffect(() => {
    identifyLearner(user?.id ?? null);
    const refresh = () => {
      identifyLearner(user?.id ?? null);
      track('page_view', {
        page: location.pathname
          .replace(/\/learn\/[^/]+/, '/learn/:id')
          .replace(/\/blog\/[^/]+/, '/blog/:slug')
          .replace(/\/showcase\/[^/]+/, '/showcase/:slug')
          .replace(/\/paths\/[^/]+/, '/paths/:id'),
      });
    };
    window.addEventListener('aiquest:consent', refresh);
    return () => window.removeEventListener('aiquest:consent', refresh);
  }, [user?.id, location.pathname]);
  useEffect(() => {
    track('page_view', {
      page: location.pathname
        .replace(/\/learn\/[^/]+/, '/learn/:id')
        .replace(/\/blog\/[^/]+/, '/blog/:slug')
        .replace(/\/showcase\/[^/]+/, '/showcase/:slug')
        .replace(/\/paths\/[^/]+/, '/paths/:id'),
    });
  }, [location.pathname]);
  return null;
}
export function PrivacyConsent() {
  const [consent, setConsent] = useState(analyticsConsent());
  useEffect(() => {
    const update = () => setConsent(analyticsConsent());
    window.addEventListener('aiquest:consent', update);
    return () => window.removeEventListener('aiquest:consent', update);
  }, []);
  if (consent) return null;
  return (
    <div className="aq-consent" role="dialog" aria-label="Analytics preferences" aria-modal="false">
      <div>
        <strong>Optional product analytics</strong>
        <p>
          Help us improve learning with privacy-conscious usage analytics and experiments. PostHog
          and Mixpanel are off until you agree. You can decline and still learn.
        </p>
      </div>
      <div className="aq-consent-actions">
        <button type="button" onClick={() => setAnalyticsConsent(false)}>
          Decline
        </button>
        <button type="button" onClick={() => setAnalyticsConsent(true)}>
          Allow analytics
        </button>
      </div>
    </div>
  );
}
