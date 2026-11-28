import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Copy, Check, Users, ArrowLeft } from 'lucide-react';
import type { ReferralOverview } from '@sapling/contracts';
import { api } from '../../core/api/client';
import { track } from '../../core/analytics/analytics';
export function ReferralsPage() {
  const query = useQuery({
    queryKey: ['referrals'],
    queryFn: () => api<{ data: ReferralOverview }>('/referrals/me'),
  });
  const [copied, setCopied] = useState(false);
  const d = query.data?.data;
  return (
    <div className="aq-page aq-referrals">
      <Link className="aq-back" to="/app">
        <ArrowLeft size={16} /> My dashboard
      </Link>
      <header className="aq-page-heading">
        <span className="aq-kicker">LEARN TOGETHER</span>
        <h1>Invite a developer into AI.</h1>
        <p>
          Share your code with a friend. Referrals are counted as qualified when the new learner
          completes their first lesson.
        </p>
      </header>
      {query.isLoading ? (
        <p>Loading your invite code…</p>
      ) : query.isError ? (
        <p role="alert">Unable to load referrals.</p>
      ) : d ? (
        <div className="aq-referral-panel">
          <div>
            <span className="aq-kicker">YOUR PERSONAL CODE</span>
            <h2>{d.code}</h2>
            <p>Send your link to someone who would enjoy learning AI alongside you.</p>
            <div className="aq-referral-link">
              <input readOnly value={d.inviteUrl} aria-label="Referral invitation link" />
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(d.inviteUrl);
                    setCopied(true);
                    track('referral_link_copied');
                  } catch {
                    setCopied(false);
                  }
                }}
              >
                {copied ? <Check size={17} /> : <Copy size={17} />}{' '}
                {copied ? 'Copied' : 'Copy link'}
              </button>
            </div>
          </div>
          <div className="aq-referral-stats">
            <Users size={24} />
            <strong>{d.signups}</strong>
            <span>Signups</span>
            <strong>{d.qualified}</strong>
            <span>First lessons completed</span>
          </div>
        </div>
      ) : null}
      <p className="aq-muted">
        There is no cash reward or discount associated with referrals in this beta. Referrals are
        attributable only to new accounts.
      </p>
    </div>
  );
}
