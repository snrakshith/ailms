# API reference

The Express backend publishes `/openapi.json` in every environment and Swagger UI at `/docs` in development only. Shared Zod request-validation schemas live in `packages/contracts/src/index.ts`; the current OpenAPI document summarizes routes and responses, but does not yet auto-generate all request/response JSON Schemas.

## Example flow
1. `GET /api/v1/auth/csrf` to obtain signed token and cookie.
2. `POST /api/v1/auth/register` with `x-csrf-token` and JSON `{name,email,password}`; caller receives HttpOnly `session` cookie.
3. `GET /api/v1/tasks` using the cookie.
4. `POST /api/v1/tasks` with signed CSRF header and `{title,description,status}`.
5. `PATCH /api/v1/tasks/{id}` with `{status:"done"}` and token.
6. `GET /api/v1/audit` (owner only).

All responses use JSON; errors are `application/problem+json` with correlation metadata.
