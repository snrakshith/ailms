#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../.."
: "${METRICS_TOKEN:?export METRICS_TOKEN first}"
printf %s "$METRICS_TOKEN" > docker/metrics.token
chmod 600 docker/metrics.token
echo 'docker/metrics.token created for Prometheus (ignored by git)'
