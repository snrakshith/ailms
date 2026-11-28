export const config = {
  apiBase: import.meta.env.VITE_API_BASE || '/api/v1',
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  sentryDsn: import.meta.env.VITE_SENTRY_DSN || '',
  release: import.meta.env.VITE_RELEASE || 'development',
  posthogKey: import.meta.env.VITE_POSTHOG_KEY || '',
  posthogHost: import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com',
  mixpanelToken: import.meta.env.VITE_MIXPANEL_TOKEN || '',
  statusPageUrl: import.meta.env.VITE_STATUS_PAGE_URL || '',
} as const;
