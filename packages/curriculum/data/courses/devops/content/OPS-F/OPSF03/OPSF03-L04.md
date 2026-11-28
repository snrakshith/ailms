# Artifacts, caching and dependency locking

**Level:** beginner · **Estimated time:** 90 min · **ID:** `OPSF03-L04`

## Learning objectives

- Explain the mechanism behind Artifacts, caching and dependency locking.
- Implement or demonstrate: Hash a build artifact and detect a changed copy.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

An artifact is an immutable build output; a cache is an optimization and must not determine correctness. Lock dependencies and verify hashes for reproducibility. Separate caches across trust boundaries.

## Worked example

A PR cache poisoned with a malicious binary must never be consumed by a privileged release job.

## Common failure mode

A branch-name tag is not immutable and cached dependencies are not release evidence.

## Implementation snippet

Try the lab before opening the solution.

```bash
sha256sum artifact.tar > artifact.sha256
sha256sum -c artifact.sha256
```

Executable reference: see lab and solution files.

## Hands-on exercise

Hash a build artifact and detect a changed copy.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Artifacts, caching and dependency locking using the worked scenario.

## Knowledge check

1. Explain the mechanism of Artifacts, caching and dependency locking using the worked scenario.
2. What failure should you watch for in Artifacts, caching and dependency locking, and how would you detect or prevent it?

## Review resources

- https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts
