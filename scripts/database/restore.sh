#!/usr/bin/env bash
set -euo pipefail
: "${MONGODB_URI:?Set MONGODB_URI for the destination database}"
: "${RESTORE_ARCHIVE:?Set RESTORE_ARCHIVE path}"
: "${CONFIRM_RESTORE:?Set CONFIRM_RESTORE=YES_I_ACCEPT_DATA_LOSS}"
[[ "$CONFIRM_RESTORE" == 'YES_I_ACCEPT_DATA_LOSS' ]] || { echo 'Restore refused: explicit acknowledgement required' >&2; exit 1; }
command -v mongorestore >/dev/null || { echo 'mongorestore is required' >&2; exit 1; }
[[ -f "$RESTORE_ARCHIVE" ]] || { echo 'Archive missing' >&2; exit 1; }
[[ -f "$RESTORE_ARCHIVE.sha256" ]] && (cd "$(dirname "$RESTORE_ARCHIVE")" && sha256sum -c "$(basename "$RESTORE_ARCHIVE").sha256")
mongorestore --uri="$MONGODB_URI" --archive="$RESTORE_ARCHIVE" --gzip --drop
printf 'Restore completed. Run API smoke tests and verify data.\n'
