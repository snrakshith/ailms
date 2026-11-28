# Security foundations — quick reference

## Threat modeling and secure pipeline design

Identify assets, actors, trust boundaries and threats before selecting scanners. SAST examines source, SCA known dependency issues, DAST running behavior; each is incomplete. Use least privilege, OIDC, isolated runners and auditable gates.

**Watch for:** Passing scans cannot establish absence of vulnerabilities.

## Hooks, Husky, linting and local feedback

Pre-commit checks shorten feedback; pre-push may run tests or scans. Husky manages Git hooks for Node projects; ESLint/Prettier improve quality. CI repeats required checks because local hooks are bypassable.

**Watch for:** Do not store secrets in hook configs or assume hooks are mandatory security gates.
