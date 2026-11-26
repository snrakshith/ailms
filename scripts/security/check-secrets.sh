#!/usr/bin/env bash
set -euo pipefail
if command -v gitleaks >/dev/null; then gitleaks detect --source . --no-banner; else echo 'Install gitleaks to run secret scanning'; exit 1; fi
