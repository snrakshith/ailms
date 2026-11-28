# Continuous integration — quick reference

## CI/CD fundamentals and release strategies
CI integrates changes with repeatable builds and tests. Delivery keeps artifacts deployable; deployment releases automatically when gates pass. Build once, promote the same immutable artifact. Canary and blue-green reduce release risk but require health criteria.

**Watch for:** Rebuilding per environment can change dependencies and invalidate earlier evidence.


## GitHub Actions workflows
Events trigger workflows containing jobs and steps. Jobs can depend on others through needs; workflow permissions define token scope. Separate untrusted PR jobs from deployment and avoid interpolating untrusted text into shell scripts.

**Watch for:** Mutable action tags and privileged pull_request_target can expose secrets to untrusted code.


## Jenkins declarative pipeline
Jenkins controller schedules agents; declarative stages specify ordered work. Isolate build agents, constrain credentials and install only reviewed pinned plugins. Store Jenkinsfile alongside code.

**Watch for:** Printing secrets or reusing a workspace across trust levels leaks data.


## Artifacts, caching and dependency locking
An artifact is an immutable build output; a cache is an optimization and must not determine correctness. Lock dependencies and verify hashes for reproducibility. Separate caches across trust boundaries.

**Watch for:** A branch-name tag is not immutable and cached dependencies are not release evidence.
