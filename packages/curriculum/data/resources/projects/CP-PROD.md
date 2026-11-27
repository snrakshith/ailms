# Production AI release pipeline

Deploy a model or assistant as an observable, reproducible service.

## Deliverables
- [ ] Container and API
- [ ] CI tests and evaluation gates
- [ ] version manifest
- [ ] threat model
- [ ] monitoring and cost budgets
- [ ] rollback runbook

## Acceptance criteria
Failed gates block deploy; rollback tested locally; logs omit secrets.

## Grading rubric (100 points)
- Functional Correctness: 30
- Evaluation And Evidence: 30
- Reproducibility And Documentation: 20
- Safety And Reliability: 20

Suggested pass: 75/100, with no unresolved critical safety or data leakage issue. Submit repository, test output and evaluation report.
