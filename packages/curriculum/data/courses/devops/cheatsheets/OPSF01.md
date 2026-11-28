# Linux & shell — quick reference

## Processes, files and permissions

Linux exposes process state through PID, parent PID, signals and open descriptors. Permissions apply to owner/group/other; directory execute grants traversal. Prefer graceful SIGTERM and inspect before stopping processes.

**Watch for:** chmod 777 hides the root cause and broadens access.

## Shell scripting and automation

Shell exit codes are part of a command contract. Quote expansions, validate inputs, use a deliberate working directory and handle temporary files with traps. pipefail prevents upstream failures being masked in Bash.

**Watch for:** set -e does not replace explicit checks and has exceptions in conditional contexts.

## Networking, DNS, HTTP and TLS

DNS resolves names, TCP establishes transport, TLS authenticates endpoints and encrypts traffic, HTTP carries requests. Separate name lookup, connectivity, TLS and app status when debugging.

**Watch for:** Do not disable certificate verification to fix trust errors.
