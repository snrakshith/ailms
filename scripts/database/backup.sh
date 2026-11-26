#!/usr/bin/env bash
set -euo pipefail
# Requires MongoDB Database Tools (mongodump). Archive should be encrypted at rest by your backup destination.
: "${MONGODB_URI:?Set MONGODB_URI for the target database}"
: "${BACKUP_DIR:?Set a secure BACKUP_DIR}"
command -v mongodump >/dev/null || { echo 'mongodump is required' >&2; exit 1; }
umask 077
mkdir -p "$BACKUP_DIR"
stamp="$(date -u +%Y%m%dT%H%M%SZ)"
file="$BACKUP_DIR/aiquest-$stamp.archive.gz"
mongodump --uri="$MONGODB_URI" --archive="$file" --gzip
sha256sum "$file" > "$file.sha256"
printf 'Backup written to %s (protect it with encrypted storage and a retention policy)\n' "$file"
