# Progressive delivery and quality gates

**Level:** advanced · **Estimated time:** 120 min · **ID:** `OPSP01-L02`

## Learning objectives
- Explain the mechanism behind Progressive delivery and quality gates.
- Implement or demonstrate: Apply a release gate to synthetic metrics with both healthy and unhealthy candidates.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Canary decisions compare candidate error rate/latency against baseline with minimum sample size. Promotion requires approved metrics, signature and scan evidence; rollback has predefined triggers.

## Worked example
A candidate with 1 error in 2 requests is too small a sample for confident promotion.

## Common failure mode
Do not promote solely because no alerts fired; unknown evidence fails closed.

## Implementation snippet
Try the lab before opening the solution.

```bash
python labs/solutions/release_gate.py
```

Executable reference: see lab and solution files.

## Hands-on exercise
Apply a release gate to synthetic metrics with both healthy and unhealthy candidates.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Progressive delivery and quality gates using the worked scenario.

## Knowledge check
1. Explain the mechanism of Progressive delivery and quality gates using the worked scenario.
2. What failure should you watch for in Progressive delivery and quality gates, and how would you detect or prevent it?

## Review resources
- https://argo-rollouts.readthedocs.io/en/stable/
