import { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from '../core/auth/auth-context';
import { Loading } from '../shared/components/ui/loading';
import { Shell } from './layouts/shell';
import { AuthPage } from '../features/auth/pages/auth-page';
import { HomePage } from '../features/marketing/pages/home-page';
import { PricingPage } from '../features/marketing/pages/pricing-page';
import { FaqPage } from '../features/marketing/pages/faq-page';
import { BlogPage, BlogArticlePage } from '../features/marketing/pages/blog-page';
import { StatusPage } from '../features/marketing/pages/status-page';
import { ReferralsPage } from '../features/referrals/referrals-page';
import { SeoRouteObserver } from '../features/marketing/seo/seo-router';
const BillingPage = lazy(() =>
  import('../features/billing/billing-page').then((x) => ({ default: x.BillingPage })),
);
const PaymentReturnPage = lazy(() =>
  import('../features/billing/payment-return-page').then((x) => ({ default: x.PaymentReturnPage })),
);
const ReviewPage = lazy(() =>
  import('../features/experience/pages/review-page').then((x) => ({ default: x.ReviewPage })),
);
const LabsPage = lazy(() =>
  import('../features/experience/pages/labs-page').then((x) => ({ default: x.LabsPage })),
);
const PortfolioPage = lazy(() =>
  import('../features/experience/pages/portfolio-page').then((x) => ({ default: x.PortfolioPage })),
);
const PublicShowcasePage = lazy(() =>
  import('../features/experience/pages/portfolio-page').then((x) => ({
    default: x.PublicShowcasePage,
  })),
);
const StudioPage = lazy(() =>
  import('../features/experience/pages/studio-page').then((x) => ({ default: x.StudioPage })),
);
const PrivacyPage = lazy(() =>
  import('../features/experience/pages/privacy-page').then((x) => ({ default: x.PrivacyPage })),
);
const DashboardPage = lazy(() =>
  import('../features/dashboard/pages/dashboard-page').then((x) => ({ default: x.DashboardPage })),
);
const PathsPage = lazy(() =>
  import('../features/learning/pages/paths-page').then((x) => ({ default: x.PathsPage })),
);
const PathDetailPage = lazy(() =>
  import('../features/learning/pages/path-detail-page').then((x) => ({
    default: x.PathDetailPage,
  })),
);
const LessonPage = lazy(() =>
  import('../features/learning/pages/lesson-page').then((x) => ({ default: x.LessonPage })),
);
const ResourceLibraryPage = lazy(() =>
  import('../features/learning/pages/resource-library-page').then((x) => ({
    default: x.ResourceLibraryPage,
  })),
);
const FlashcardsPage = lazy(() =>
  import('../features/learning/pages/flashcards-page').then((x) => ({ default: x.FlashcardsPage })),
);
const ProgressPage = lazy(() =>
  import('../features/progress/pages/progress-page').then((x) => ({ default: x.ProgressPage })),
);
const OnboardingPage = lazy(() =>
  import('../features/onboarding/pages/onboarding-page').then((x) => ({
    default: x.OnboardingPage,
  })),
);
const SettingsPage = lazy(() =>
  import('../features/settings/pages/settings-page').then((x) => ({ default: x.SettingsPage })),
);
function Private({ children, onboarding = false }: { children: ReactNode; onboarding?: boolean }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <Loading />;
  if (!user)
    return (
      <Navigate
        to={`/login?next=${encodeURIComponent(location.pathname + location.search)}`}
        replace
      />
    );
  if (!onboarding && !user.onboarding?.goal) return <Navigate to="/onboarding" replace />;
  return onboarding ? (
    <Suspense fallback={<Loading />}>{children}</Suspense>
  ) : (
    <Shell>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </Shell>
  );
}
export default function App() {
  return (
    <>
      <SeoRouteObserver />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogArticlePage />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route
          path="/onboarding"
          element={
            <Private onboarding>
              <OnboardingPage />
            </Private>
          }
        />
        <Route
          path="/app"
          element={
            <Private>
              <DashboardPage />
            </Private>
          }
        />
        <Route
          path="/paths"
          element={
            <Private>
              <PathsPage />
            </Private>
          }
        />
        <Route
          path="/paths/:pathId"
          element={
            <Private>
              <PathDetailPage />
            </Private>
          }
        />
        <Route
          path="/learn/:lessonId"
          element={
            <Private>
              <LessonPage />
            </Private>
          }
        />
        <Route
          path="/library"
          element={
            <Private>
              <ResourceLibraryPage />
            </Private>
          }
        />
        <Route
          path="/flashcards"
          element={
            <Private>
              <FlashcardsPage />
            </Private>
          }
        />
        <Route
          path="/progress"
          element={
            <Private>
              <ProgressPage />
            </Private>
          }
        />
        <Route
          path="/referrals"
          element={
            <Private>
              <ReferralsPage />
            </Private>
          }
        />
        <Route
          path="/billing"
          element={
            <Private>
              <BillingPage />
            </Private>
          }
        />
        <Route
          path="/billing/return"
          element={
            <Private>
              <PaymentReturnPage />
            </Private>
          }
        />
        <Route
          path="/review"
          element={
            <Private>
              <ReviewPage />
            </Private>
          }
        />
        <Route
          path="/labs"
          element={
            <Private>
              <LabsPage />
            </Private>
          }
        />
        <Route
          path="/portfolio"
          element={
            <Private>
              <PortfolioPage />
            </Private>
          }
        />
        <Route
          path="/studio"
          element={
            <Private>
              <StudioPage />
            </Private>
          }
        />
        <Route
          path="/privacy"
          element={
            <Private>
              <PrivacyPage />
            </Private>
          }
        />
        <Route
          path="/showcase/:slug"
          element={
            <Suspense fallback={<Loading />}>
              <PublicShowcasePage />
            </Suspense>
          }
        />
        <Route
          path="/settings"
          element={
            <Private>
              <SettingsPage />
            </Private>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
