# Frontend architecture and implementation

## A–L capabilities delivered together
A. Application: feature-first React Router, provider composition, lazy routes, error boundary.
B. UI: reusable Button, Storybook, CSS design tokens, responsive sidebar/dashboard.
C. State: TanStack Query server cache, RHF/Zod forms, typed client, cancellation timeout.
D. Security: HttpOnly session integration, signed CSRF header, no localStorage credentials, backend-enforced authorization.
E. Observability: Web Vitals callbacks, opt-in Sentry, request IDs and traceparent propagation.
F. Reliability: request deadlines, query retry, loading/error/empty states, API failure boundaries.
G. Performance: lazy routes, Vite vendor chunking, immutable asset caching, Lighthouse budgets.
H. Accessibility: semantic forms/nav, keyboard focus styles, reduced-motion, Storybook a11y and axe sample.
I. Testing: Vitest+RTL, Playwright browser flow, visual baseline strategy.
J. Delivery: multi-stage Docker, unprivileged Nginx, Kubernetes Helm and CI.
K. Product capabilities: themes, locale example, typed feature flags, optional static PWA fallback.
L. Governance: documents, security checklist, release and upgrade conventions.

## Files and ownership
`app/` owns router and shell; `core/` owns shared client facilities; `features/` owns product capabilities; `shared/` hosts reusable components; `styles/` contains design tokens. No domain/application/presentation layering is required for a simple UI feature.

## Explicit extensions
SSR/SSG for public SEO-heavy applications requires a separate React metaframework; this SPA does not pretend to provide SSR. Full i18n translation infrastructure, offline mutation sync, visual baseline service and enterprise feature flag provider need real integrations and product-specific decisions.
