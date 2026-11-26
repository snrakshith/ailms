# ADR 0001 — Fullstack TypeScript workspaces

**Decision:** Use npm workspaces containing React/Vite, Express/Mongoose, and a shared Zod contract package. Keep domain modules simple; build platform utilities in core/infrastructure rather than creating a NestJS clone.

**Rationale:** API and UI evolve together; typed schemas reduce drift. Explicit dependency assembly is easy to debug. MongoDB follows the source backend template, React/Vite follows the source frontend template.

**Tradeoffs:** SPA does not provide SEO-first SSR; credentials and metrics require deployment configuration. End-to-end event delivery is not transactional. For SEO-intensive public sites, consider an SSR framework separately.
