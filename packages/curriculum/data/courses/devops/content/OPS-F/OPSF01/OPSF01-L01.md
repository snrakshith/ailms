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
