# Secure delivery SOP

1. Developer: branch from main, run lint/test and local secret checks; submit PR.
2. Reviewer: review code, workflow changes, dependencies, threat boundaries.
3. PR CI: read-only token, isolated runner, no deployment secrets; run tests, SAST, SCA and secret scanning.
4. Trusted build: approved commit, verified dependencies, immutable digest; image scan, SBOM and provenance.
5. Signing: restricted identity after gates. Attach evidence to digest.
6. Staging GitOps: reviewed desired digest, policy enforcement, health, authorized DAST.
7. Release: check evidence, signature, metrics and approval; promote same digest, not rebuild.
8. Incident: halt promotion, revert Git, verify rollback health, preserve audit evidence; handle schema migration separately.

Exception contract: finding ID, scope/digest, owner, rationale, compensating control, expiry and approval. Fail closed on missing scanner evidence or expired exception. Verify scanners themselves; a SHA pin alone does not guarantee trustworthy code.
