# Static application security — quick reference

## Semgrep and rule-based SAST

Semgrep matches structural code patterns and can track dataflow depending on engine/rules. Select trusted rule packs, distinguish false positives and define blocking severity with exceptions.

**Watch for:** Scanning only changed files misses contextual findings; do periodic full scans.

## CodeQL, SonarQube and Checkmarx

CodeQL builds queryable code databases and finds semantic flows; SonarQube combines quality/security analysis and quality gates; Checkmarx offers enterprise SAST and related capabilities. Language/build coverage and licensing differ.

**Watch for:** A green quality gate does not replace review or threat modeling.
