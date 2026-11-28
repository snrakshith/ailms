import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../core/auth/auth-context';
import { LocaleProvider } from '../core/i18n/locale';
import { ThemeProvider } from '../core/theme/theme';
import { ErrorBoundary } from './boundaries/error-boundary';
import { AnalyticsObserver, PrivacyConsent } from '../core/analytics/consent';
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 10_000, refetchOnWindowFocus: false } },
});
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LocaleProvider>
            <BrowserRouter>
              <AuthProvider>
                <AnalyticsObserver />
                {children}
                <PrivacyConsent />
              </AuthProvider>
            </BrowserRouter>
          </LocaleProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
