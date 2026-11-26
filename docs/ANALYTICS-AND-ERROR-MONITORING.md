# PostHog, Mixpanel and Sentry

- **PostHog**: feature flags and A/B experiments. `useExperiment('homepage-hero-copy')` accepts `control` and `practical` for the hero; create this flag/experiment in PostHog and use `experiment_exposed` and conversion events as appropriate.
- **Mixpanel**: product funnel and learning-retention analytics. Both tools are initialized only after optional analytics consent. Pageview, registration, sign-in, checkout start and referral link sharing events go through `core/analytics/analytics.ts`.
- **Sentry**: optional frontend/backend error reporting; set `VITE_SENTRY_DSN` and `SENTRY_DSN`. API error handler captures unexpected 5xx only. No PII by default. Source-map upload is not automated; add it before public release with a protected Sentry token.

The analytics consent choice is local to each browser and can be changed in Settings → Privacy & analytics; `setAnalyticsConsent` persists and broadcasts the selection. Autocapture and session replay are disabled. Avoid sending passwords, emails, prompts, student code, payment IDs or quiz answers. Tracking anonymous IDs must be considered personal data under relevant laws. Review cookie/privacy policy, retention periods, deletion requests and consent management for your jurisdiction.

Configure PostHog project key and host, Mixpanel token and Sentry DSNs only when services are provisioned; no SDK keys are present in the source package. A/B assignments and events are not confirmed live without accounts.
