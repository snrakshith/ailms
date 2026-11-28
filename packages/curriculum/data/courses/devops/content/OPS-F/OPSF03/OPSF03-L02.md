# GitHub Actions workflows

**Level:** beginner · **Estimated time:** 90 min · **ID:** `OPSF03-L02`

## Learning objectives

- Explain the mechanism behind GitHub Actions workflows.
- Implement or demonstrate: Create a CI workflow and show that a failing test stops downstream jobs.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Events trigger workflows containing jobs and steps. Jobs can depend on others through needs; workflow permissions define token scope. Separate untrusted PR jobs from deployment and avoid interpolating untrusted text into shell scripts.

## Worked example

Run tests on pull_request with read-only token and no production secrets. Deployment runs from approved main commits.

## Common failure mode

Mutable action tags and privileged pull_request_target can expose secrets to untrusted code.

## Implementation snippet

```bash
python -m unittest discover -s tests -v
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise

Create a CI workflow and show that a failing test stops downstream jobs.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of GitHub Actions workflows using the worked scenario.

## Knowledge check

1. Explain the mechanism of GitHub Actions workflows using the worked scenario.
2. What failure should you watch for in GitHub Actions workflows, and how would you detect or prevent it?

## Review resources

- https://docs.github.com/en/actions/reference/security/secure-use
