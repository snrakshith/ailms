# CI/CD fundamentals and release strategies

**Level:** beginner · **Estimated time:** 90 min · **ID:** `OPSF03-L01`

## Learning objectives
- Explain the mechanism behind CI/CD fundamentals and release strategies.
- Implement or demonstrate: Design a pipeline with build, test, scan, publish, deploy and rollback.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
CI integrates changes with repeatable builds and tests. Delivery keeps artifacts deployable; deployment releases automatically when gates pass. Build once, promote the same immutable artifact. Canary and blue-green reduce release risk but require health criteria.

## Worked example
A candidate receives 5% of traffic; compare error rates and latency against baseline before promotion.

## Common failure mode
Rebuilding per environment can change dependencies and invalidate earlier evidence.

## Implementation snippet
```bash
# Conceptual stages: test -> build -> scan -> sign -> staging -> approve -> production
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise
Design a pipeline with build, test, scan, publish, deploy and rollback.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of CI/CD fundamentals and release strategies using the worked scenario.

## Knowledge check
1. Explain the mechanism of CI/CD fundamentals and release strategies using the worked scenario.
2. What failure should you watch for in CI/CD fundamentals and release strategies, and how would you detect or prevent it?

## Review resources
- https://docs.github.com/en/actions
