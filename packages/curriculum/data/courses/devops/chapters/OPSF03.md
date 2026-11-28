# Continuous integration

Study in this order; each section contains an independent lesson.

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


---

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


---

# Jenkins declarative pipeline

**Level:** beginner · **Estimated time:** 90 min · **ID:** `OPSF03-L03`

## Learning objectives
- Explain the mechanism behind Jenkins declarative pipeline.
- Implement or demonstrate: Create a Jenkinsfile with test and archive stages on a disposable agent.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Jenkins controller schedules agents; declarative stages specify ordered work. Isolate build agents, constrain credentials and install only reviewed pinned plugins. Store Jenkinsfile alongside code.

## Worked example
A controller should orchestrate rather than execute arbitrary PR builds on itself.

## Common failure mode
Printing secrets or reusing a workspace across trust levels leaks data.

## Implementation snippet
```bash
pipeline { agent any; stages { stage('Test') { steps { sh 'python3 -m unittest discover -s tests' } } } }
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise
Create a Jenkinsfile with test and archive stages on a disposable agent.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Jenkins declarative pipeline using the worked scenario.

## Knowledge check
1. Explain the mechanism of Jenkins declarative pipeline using the worked scenario.
2. What failure should you watch for in Jenkins declarative pipeline, and how would you detect or prevent it?

## Review resources
- https://www.jenkins.io/doc/book/pipeline/


---

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
