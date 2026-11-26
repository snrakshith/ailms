#!/usr/bin/env bash
set -euo pipefail
# This script MUST run against disposable stack credentials and data ONLY.
# Never pass real AWS, Google or payment secrets. It performs ACTIVE API testing.
cd "$(dirname "$0")/../.."
: "${JWT_SECRET:?Use a dedicated disposable DAST secret}"
: "${METRICS_TOKEN:?Use a disposable DAST metrics token}"
: "${CASHFREE_ENABLED:=false}"
: "${SES_ENABLED:=false}"
if [[ "$CASHFREE_ENABLED" != false || "$SES_ENABLED" != false ]]; then
  echo 'Refusing DAST when real payment/email integrations are enabled.' >&2; exit 2
fi
if [[ -n "${AIQUEST_LLM_KEY:-}" || -n "${GOOGLE_CLIENT_ID:-}" ]]; then
  echo 'Refusing DAST with external provider credentials configured.' >&2; exit 2
fi
if [[ ! -s pnpm-lock.yaml ]]; then echo 'DAST requires a resolved pnpm-lock.yaml.' >&2; exit 2; fi
command -v docker >/dev/null || { echo 'Docker is required for DAST.' >&2; exit 2; }
mkdir -p reports/zap
chmod 777 reports/zap
cleanup() { docker compose -f docker/compose.yaml down -v --remove-orphans >/dev/null 2>&1 || true; }
trap cleanup EXIT
docker compose -f docker/compose.yaml up -d --build
# Compose starts production-built API/web containers and waits for API readiness.
for attempt in $(seq 1 60); do
  if curl --fail --silent http://127.0.0.1:8080/ >/dev/null && curl --fail --silent http://127.0.0.1:4000/health/ready >/dev/null; then break; fi
  if [[ "$attempt" -eq 60 ]]; then echo 'DAST stack did not become ready.' >&2; exit 2; fi
  sleep 5
done

# Override via image digest in production repository policy; never use arbitrary URLs as scan targets.
ZAP_IMAGE="${ZAP_IMAGE:-ghcr.io/zaproxy/zaproxy:stable}"
run_scan(){
  local title="$1"; shift
  echo "Running OWASP ZAP $title against disposable localhost stack"
  set +e
  docker run --rm --network host -v "$(pwd)/reports/zap:/zap/wrk:rw" "$ZAP_IMAGE" "$@"
  local status=$?
  set -e
  # 0: OK, 1: alert FAIL, 2: WARN. Severe findings are gated by the report parser.
  # 3 or more means an operational error and must fail closed.
  if [[ "$status" -gt 2 ]]; then echo "ZAP $title execution failed: $status" >&2; exit "$status"; fi
}
run_scan 'web baseline (passive)' zap-baseline.py -t http://127.0.0.1:8080 -m 3 -I -J web-baseline.json -r web-baseline.html
run_scan 'OpenAPI active scan' zap-api-scan.py -t http://127.0.0.1:4000/openapi.json -f openapi -I -J api-active.json -r api-active.html
node scripts/security/zap-report-gate.mjs reports/zap/web-baseline.json reports/zap/api-active.json
