# Linux & shell

Study in this order; each section contains an independent lesson.

# Processes, files and permissions

**Level:** beginner · **Estimated time:** 90 min · **ID:** `OPSF01-L01`

## Learning objectives

- Explain the mechanism behind Processes, files and permissions.
- Implement or demonstrate: Create a local temporary config, set owner-only permissions and verify them.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Linux exposes process state through PID, parent PID, signals and open descriptors. Permissions apply to owner/group/other; directory execute grants traversal. Prefer graceful SIGTERM and inspect before stopping processes.

## Worked example

A service cannot read a config with mode 600 owned by another account. Check identity and path permissions before changing modes.

## Common failure mode

chmod 777 hides the root cause and broadens access.

## Implementation snippet

Try the lab before opening the solution.

```bash
d=$(mktemp -d); touch "$d/config"; chmod 600 "$d/config"; stat -c '%a %n' "$d/config"; rm "$d/config"; rmdir "$d"
```

Executable reference: see lab and solution files.

## Hands-on exercise

Create a local temporary config, set owner-only permissions and verify them.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Processes, files and permissions using the worked scenario.

## Knowledge check

1. Explain the mechanism of Processes, files and permissions using the worked scenario.
2. What failure should you watch for in Processes, files and permissions, and how would you detect or prevent it?

## Review resources

- https://www.gnu.org/software/coreutils/manual/

---

# Shell scripting and automation

**Level:** beginner · **Estimated time:** 90 min · **ID:** `OPSF01-L02`

## Learning objectives

- Explain the mechanism behind Shell scripting and automation.
- Implement or demonstrate: Write a script that rejects missing input and emits a deterministic artifact.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Shell exit codes are part of a command contract. Quote expansions, validate inputs, use a deliberate working directory and handle temporary files with traps. pipefail prevents upstream failures being masked in Bash.

## Worked example

A build piped through tee can appear successful when the build failed; pipefail preserves the failed pipeline status.

## Common failure mode

set -e does not replace explicit checks and has exceptions in conditional contexts.

## Implementation snippet

```bash
#!/usr/bin/env bash
set -euo pipefail
[[ $# -eq 1 && -f "$1" ]] || { echo 'expected existing file' >&2; exit 2; }
sha256sum -- "$1"
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise

Write a script that rejects missing input and emits a deterministic artifact.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Shell scripting and automation using the worked scenario.

## Knowledge check

1. Explain the mechanism of Shell scripting and automation using the worked scenario.
2. What failure should you watch for in Shell scripting and automation, and how would you detect or prevent it?

## Review resources

- https://www.gnu.org/software/bash/manual/

---

# Networking, DNS, HTTP and TLS

**Level:** beginner · **Estimated time:** 90 min · **ID:** `OPSF01-L03`

## Learning objectives

- Explain the mechanism behind Networking, DNS, HTTP and TLS.
- Implement or demonstrate: Trace a local HTTP endpoint and distinguish connection error from HTTP error.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

DNS resolves names, TCP establishes transport, TLS authenticates endpoints and encrypts traffic, HTTP carries requests. Separate name lookup, connectivity, TLS and app status when debugging.

## Worked example

A 502 from a proxy indicates it answered HTTP, unlike a DNS failure or TCP timeout.

## Common failure mode

Do not disable certificate verification to fix trust errors.

## Implementation snippet

```bash
python -m http.server 8080 --bind 127.0.0.1
# separate terminal
curl --fail --max-time 3 -i http://127.0.0.1:8080/
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise

Trace a local HTTP endpoint and distinguish connection error from HTTP error.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Networking, DNS, HTTP and TLS using the worked scenario.

## Knowledge check

1. Explain the mechanism of Networking, DNS, HTTP and TLS using the worked scenario.
2. What failure should you watch for in Networking, DNS, HTTP and TLS, and how would you detect or prevent it?

## Review resources

- https://curl.se/docs/manpage.html
