# Container quick start

1. From repo root copy `.env.example` to `.env`, replace the example secrets, then run `pnpm run docker:up`.
2. Open http://localhost:8080 and register a workspace.
3. Docker images compile shared contracts and both applications in isolated build stages.
4. API listens on localhost:4000 only; web Nginx reverse-proxies same-origin `/api/` requests.
5. This Compose environment is for local evaluation; production must use a TLS terminator, real secrets, an authenticated database, and backups.
