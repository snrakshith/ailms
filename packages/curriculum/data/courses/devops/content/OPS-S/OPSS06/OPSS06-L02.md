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
