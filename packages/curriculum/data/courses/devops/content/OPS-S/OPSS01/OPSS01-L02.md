# Hooks, Husky, linting and local feedback

**Level:** intermediate · **Estimated time:** 120 min · **ID:** `OPSS01-L02`

## Learning objectives

- Explain the mechanism behind Hooks, Husky, linting and local feedback.
- Implement or demonstrate: Design a staged-file check and equivalent CI job.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Pre-commit checks shorten feedback; pre-push may run tests or scans. Husky manages Git hooks for Node projects; ESLint/Prettier improve quality. CI repeats required checks because local hooks are bypassable.

## Worked example

A staged file with formatting errors is fixed before commit; CI independently enforces the same standard.

## Common failure mode

Do not store secrets in hook configs or assume hooks are mandatory security gates.

## Implementation snippet

```bash
# after installing pinned project deps and configuring scripts
npm run lint
npm run format:check
npm test
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise

Design a staged-file check and equivalent CI job.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Hooks, Husky, linting and local feedback using the worked scenario.

## Knowledge check

1. Explain the mechanism of Hooks, Husky, linting and local feedback using the worked scenario.
2. What failure should you watch for in Hooks, Husky, linting and local feedback, and how would you detect or prevent it?

## Review resources

- https://typicode.github.io/husky/
- https://eslint.org/docs/latest/
