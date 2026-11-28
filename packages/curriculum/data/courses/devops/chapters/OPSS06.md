# Runtime & software supply chain

Study in this order; each section contains an independent lesson.

# Falco runtime detection

**Level:** advanced · **Estimated time:** 120 min · **ID:** `OPSS06-L01`

## Learning objectives

- Explain the mechanism behind Falco runtime detection.
- Implement or demonstrate: Analyze synthetic Falco events and map alerts to a response runbook.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Falco evaluates event streams such as system calls against rules to detect suspicious runtime behavior. Deploy with documented sensor privileges and route alerts; tune rules to workload behavior.

## Worked example

A shell started inside an application container may be unusual and warrants triage.

## Common failure mode

Runtime detection does not automatically prevent behavior; false positives need context.

## Implementation snippet

```bash
# inspect an installed Falco instance's local alerts
kubectl -n falco logs -l app.kubernetes.io/name=falco --tail=50
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise

Analyze synthetic Falco events and map alerts to a response runbook.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Falco runtime detection using the worked scenario.

## Knowledge check

1. Explain the mechanism of Falco runtime detection using the worked scenario.
2. What failure should you watch for in Falco runtime detection, and how would you detect or prevent it?

## Review resources

- https://falco.org/docs/

---

# Syft SBOM and dependency inventory

**Level:** advanced · **Estimated time:** 120 min · **ID:** `OPSS06-L02`

## Learning objectives

- Explain the mechanism behind Syft SBOM and dependency inventory.
- Implement or demonstrate: Generate a CycloneDX SBOM for a verified image and compare with a fixture inventory.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

An SBOM is an inventory of components and metadata, not a vulnerability report. Syft generates SPDX or CycloneDX from images/filesystems. Store SBOM linked to immutable artifact digest.

## Worked example

A newly disclosed CVE can be mapped to a stored SBOM without rebuilding the image.

## Common failure mode

SBOM completeness depends on package recognition; do not claim it proves absence of dependencies.

## Implementation snippet

Try the lab before opening the solution.

```bash
syft IMAGE_DIGEST -o cyclonedx-json > sbom.json
grype sbom:sbom.json --fail-on high
```

Executable reference: see lab and solution files.

## Hands-on exercise

Generate a CycloneDX SBOM for a verified image and compare with a fixture inventory.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Syft SBOM and dependency inventory using the worked scenario.

## Knowledge check

1. Explain the mechanism of Syft SBOM and dependency inventory using the worked scenario.
2. What failure should you watch for in Syft SBOM and dependency inventory, and how would you detect or prevent it?

## Review resources

- https://oss.anchore.com/docs/overview/syft/

---

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

---

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
