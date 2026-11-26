#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../.."
if [[ ! -f .env ]]; then cp .env.local.example .env; echo 'Created .env from host-local example; rotate secrets before deployment'; fi
corepack enable
pnpm install --no-frozen-lockfile
pnpm run build:shared
printf '\nReady. Run pnpm run infra:up and pnpm run dev.\n'
