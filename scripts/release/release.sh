#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../.."
pnpm run verify
echo 'Release verified locally. Publish images with immutable tags via CI.'
