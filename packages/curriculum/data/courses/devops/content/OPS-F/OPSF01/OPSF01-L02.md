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
