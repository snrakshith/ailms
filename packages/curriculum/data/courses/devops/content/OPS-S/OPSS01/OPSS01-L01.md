# Threat modeling and secure pipeline design

**Level:** intermediate · **Estimated time:** 120 min · **ID:** `OPSS01-L01`

## Learning objectives
- Explain the mechanism behind Threat modeling and secure pipeline design.
- Implement or demonstrate: Draw a data-flow threat model for source → CI → registry → cluster.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Identify assets, actors, trust boundaries and threats before selecting scanners. SAST examines source, SCA known dependency issues, DAST running behavior; each is incomplete. Use least privilege, OIDC, isolated runners and auditable gates.

## Worked example
A fork PR can run hostile code; it must not receive deployment credentials.

## Common failure mode
Passing scans cannot establish absence of vulnerabilities.

## Implementation snippet
```bash
# Gate order: PR tests + SAST/SCA/secrets -> build -> image scan/SBOM/sign -> staging DAST -> approval -> deploy
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise
Draw a data-flow threat model for source → CI → registry → cluster.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Threat modeling and secure pipeline design using the worked scenario.

## Knowledge check
1. Explain the mechanism of Threat modeling and secure pipeline design using the worked scenario.
2. What failure should you watch for in Threat modeling and secure pipeline design, and how would you detect or prevent it?

## Review resources
- https://owasp.org/www-project-threat-modeling/
- https://docs.github.com/en/actions/reference/security/secure-use
