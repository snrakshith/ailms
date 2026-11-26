# Contributing

Use feature-focused modules. TypeScript strict mode required; shared transport contracts live in `packages/contracts`. Keep backend permission and tenant checks independent of browser logic. Add tests and docs with new capabilities. Run `pnpm run verify` before opening a PR; follow conventional commits. Do not commit `.env`, resolved secrets, telemetry credentials or customer data. Add an ADR when introducing a new cross-cutting library or runtime service.
