# Secure scanners, CI identities and exceptions

**Level:** advanced · **Estimated time:** 120 min · **ID:** `OPSS06-L04`

## Learning objectives

- Explain the mechanism behind Secure scanners, CI identities and exceptions.
- Implement or demonstrate: Create a security gate policy with fail-closed scanner errors and time-bound risk exceptions.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Scanners, plugins and actions are dependencies in the trust chain. Pin actions to verified full SHAs, binaries/images to verified release hashes/digests; constrain token scope, separate PR/release trust, use OIDC and log evidence. Expire exceptions.

## Worked example

A compromised scanner can exfiltrate CI secrets; run untrusted scanning without deployment credentials and isolate permissions.

## Common failure mode

A pinned malicious version is still malicious; review provenance and advisories, rotate when compromised.

## Implementation snippet

Try the lab before opening the solution.

```bash
# Full SHA pin example placeholder: uses: owner/action@VERIFIED_40_CHARACTER_SHA
# Verify upstream source, signature/checksum and scope before substitution.
```

Executable reference: see lab and solution files.

## Hands-on exercise

Create a security gate policy with fail-closed scanner errors and time-bound risk exceptions.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Secure scanners, CI identities and exceptions using the worked scenario.

## Knowledge check

1. Explain the mechanism of Secure scanners, CI identities and exceptions using the worked scenario.
2. What failure should you watch for in Secure scanners, CI identities and exceptions, and how would you detect or prevent it?

## Review resources

- https://docs.github.com/en/actions/reference/security/secure-use
- https://docs.github.com/en/actions/reference/security/oidc
