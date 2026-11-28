# Runtime & software supply chain — quick reference

## Falco runtime detection

Falco evaluates event streams such as system calls against rules to detect suspicious runtime behavior. Deploy with documented sensor privileges and route alerts; tune rules to workload behavior.

**Watch for:** Runtime detection does not automatically prevent behavior; false positives need context.

## Syft SBOM and dependency inventory

An SBOM is an inventory of components and metadata, not a vulnerability report. Syft generates SPDX or CycloneDX from images/filesystems. Store SBOM linked to immutable artifact digest.

**Watch for:** SBOM completeness depends on package recognition; do not claim it proves absence of dependencies.

## Cosign signing, verification and provenance

Signatures bind artifact identity to a signing identity; verify digest, certificate identity and issuer or trusted key. Provenance describes build inputs and builder. Sign only after approved build and scans; verify admission policy.

**Watch for:** Do not verify with broad identity regex or mutable tags; signature alone does not assert vulnerability-free.

## Secure scanners, CI identities and exceptions

Scanners, plugins and actions are dependencies in the trust chain. Pin actions to verified full SHAs, binaries/images to verified release hashes/digests; constrain token scope, separate PR/release trust, use OIDC and log evidence. Expire exceptions.

**Watch for:** A pinned malicious version is still malicious; review provenance and advisories, rotate when compromised.
