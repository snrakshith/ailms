# Static application security

Study in this order; each section contains an independent lesson.

# Semgrep and rule-based SAST

**Level:** intermediate · **Estimated time:** 120 min · **ID:** `OPSS02-L01`

## Learning objectives
- Explain the mechanism behind Semgrep and rule-based SAST.
- Implement or demonstrate: Run a local Semgrep rule against synthetic fixture and fix it.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Semgrep matches structural code patterns and can track dataflow depending on engine/rules. Select trusted rule packs, distinguish false positives and define blocking severity with exceptions.

## Worked example
A rule detects unsafe string concatenation in query construction; parameter binding is the fix.

## Common failure mode
Scanning only changed files misses contextual findings; do periodic full scans.

## Implementation snippet
```bash
semgrep scan --config starter-code/security/semgrep.yml --error starter-code/security/sample.py
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise
Run a local Semgrep rule against synthetic fixture and fix it.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Semgrep and rule-based SAST using the worked scenario.

## Knowledge check
1. Explain the mechanism of Semgrep and rule-based SAST using the worked scenario.
2. What failure should you watch for in Semgrep and rule-based SAST, and how would you detect or prevent it?

## Review resources
- https://semgrep.dev/docs/


---

# CodeQL, SonarQube and Checkmarx

**Level:** intermediate · **Estimated time:** 120 min · **ID:** `OPSS02-L02`

## Learning objectives
- Explain the mechanism behind CodeQL, SonarQube and Checkmarx.
- Implement or demonstrate: Compare results of two scanners on the same synthetic repository and record rule coverage.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
CodeQL builds queryable code databases and finds semantic flows; SonarQube combines quality/security analysis and quality gates; Checkmarx offers enterprise SAST and related capabilities. Language/build coverage and licensing differ.

## Worked example
A tainted request parameter reaches an unsafe sink; triage by reachability and validate the fix.

## Common failure mode
A green quality gate does not replace review or threat modeling.

## Implementation snippet
```bash
# CodeQL CLI example; requires installed compatible bundle
codeql database create codeql-db --language=python --source-root=.
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise
Compare results of two scanners on the same synthetic repository and record rule coverage.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of CodeQL, SonarQube and Checkmarx using the worked scenario.

## Knowledge check
1. Explain the mechanism of CodeQL, SonarQube and Checkmarx using the worked scenario.
2. What failure should you watch for in CodeQL, SonarQube and Checkmarx, and how would you detect or prevent it?

## Review resources
- https://codeql.github.com/docs/
- https://docs.sonarsource.com/sonarqube-server/
- https://docs.checkmarx.com/
