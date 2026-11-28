# Cosign signing, verification and provenance

**Level:** advanced · **Estimated time:** 120 min · **ID:** `OPSS06-L03`

## Learning objectives

- Explain the mechanism behind Cosign signing, verification and provenance.
- Implement or demonstrate: Design signature verification for an image digest and explicit expected identity.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Signatures bind artifact identity to a signing identity; verify digest, certificate identity and issuer or trusted key. Provenance describes build inputs and builder. Sign only after approved build and scans; verify admission policy.

## Worked example

An image signed by an unrelated identity is not acceptable even if signature cryptographically valid.

## Common failure mode

Do not verify with broad identity regex or mutable tags; signature alone does not assert vulnerability-free.

## Implementation snippet

```bash
cosign verify --certificate-identity EXPECTED_IDENTITY --certificate-oidc-issuer EXPECTED_ISSUER IMAGE_DIGEST
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise

Design signature verification for an image digest and explicit expected identity.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Cosign signing, verification and provenance using the worked scenario.

## Knowledge check

1. Explain the mechanism of Cosign signing, verification and provenance using the worked scenario.
2. What failure should you watch for in Cosign signing, verification and provenance, and how would you detect or prevent it?

## Review resources

- https://docs.sigstore.dev/cosign/
