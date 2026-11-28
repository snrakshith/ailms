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
