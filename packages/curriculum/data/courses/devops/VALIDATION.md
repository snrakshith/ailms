# Validation report

Schema, lesson IDs, references, learner answer separation, Python syntax, SVG XML and notebook schemas passed: 47 lessons.


## Execution evidence
- permissions: PASS permissions
- git_revert: PASS git_revert
- artifact_hash: PASS artifact_hash
- network_model: PASS network_model
- probe_model: PASS probe_model
- error_ratio: PASS error_ratio
- log_correlation: PASS log_correlation
- slo_budget: PASS slo_budget
- sca_triage: PASS sca_triage
- fake_secret: PASS fake_secret
- policy_model: PASS policy_model
- sbom_inventory: PASS sbom_inventory
- exceptions: PASS exceptions
- release_gate: PASS release_gate
- Starter HTTP API unittest passed (real loopback HTTP health + 404): OK
- 4 HTML simulations passed Node JavaScript syntax checks and headless Chromium render, slider update, reset and JS-error smoke checks (HTML loaded into page content; local file navigation was blocked by browser policy).

## Limitations
Independent subject-matter and pedagogical review pending. Tests are smoke/example checks, not exhaustive correctness proofs. Live cloud, commercial services and external tooling are not certified. Browser visualizations passed smoke checks but still require target LMS iframe/accessibility review.

- 12 non-templated YAML files plus GitHub Actions template and Gitleaks TOML parsed successfully; schema/runtime validation for vendor-specific configuration remains pending. Helm Go templates were excluded from plain-YAML parsing.
