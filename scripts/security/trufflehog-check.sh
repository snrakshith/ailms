#!/usr/bin/env bash
set -euo pipefail
# Run on entire local history, including commits not yet pushed. For new repositories,
# filesystem scan is used until the first commit exists.
if command -v trufflehog >/dev/null 2>&1; then
  if git rev-parse --verify HEAD >/dev/null 2>&1; then
    exec trufflehog git "file://$(pwd)" --results=verified,unknown --fail --fail-on-scan-errors --no-update
  fi
  exec trufflehog filesystem . --results=verified,unknown --fail --fail-on-scan-errors --no-update
fi
if command -v docker >/dev/null 2>&1; then
  if git rev-parse --verify HEAD >/dev/null 2>&1; then
    exec docker run --rm -v "$(pwd):/repo:ro" ghcr.io/trufflesecurity/trufflehog:3.100.0 git file:///repo --results=verified,unknown --fail --fail-on-scan-errors --no-update
  fi
  exec docker run --rm -v "$(pwd):/repo:ro" ghcr.io/trufflesecurity/trufflehog:3.100.0 filesystem /repo --results=verified,unknown --fail --fail-on-scan-errors --no-update
fi
echo 'TruffleHog is required for pre-push scanning. Install its CLI or Docker; no security scan was performed.' >&2
exit 2
