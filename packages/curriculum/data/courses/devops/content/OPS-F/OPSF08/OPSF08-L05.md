# SLOs, incidents, Jira and PagerDuty

**Level:** intermediate · **Estimated time:** 90 min · **ID:** `OPSF08-L05`

## Learning objectives

- Explain the mechanism behind SLOs, incidents, Jira and PagerDuty.
- Implement or demonstrate: Run a tabletop exercise for an API error spike and calculate budget consumption.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

SLI measures service behavior, SLO targets it, error budget is allowed unreliability. PagerDuty routes on-call alerts; Jira tracks incident follow-up. Incident command coordinates mitigation, communication and blameless review.

## Worked example

99.9% monthly success allows 0.1% unsuccessful requests; budget exhaustion can pause risky releases.

## Common failure mode

A severity label without an owner and response procedure is not incident management.

## Implementation snippet

Try the lab before opening the solution.

```bash
# SLI = good_requests / total_requests; burn rate = observed_error_fraction / allowed_error_fraction
```

Executable reference: see lab and solution files.

## Hands-on exercise

Run a tabletop exercise for an API error spike and calculate budget consumption.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of SLOs, incidents, Jira and PagerDuty using the worked scenario.

## Knowledge check

1. Explain the mechanism of SLOs, incidents, Jira and PagerDuty using the worked scenario.
2. What failure should you watch for in SLOs, incidents, Jira and PagerDuty, and how would you detect or prevent it?

## Review resources

- https://sre.google/workbook/alerting-on-slos/
- https://support.pagerduty.com/
- https://support.atlassian.com/jira-software-cloud/
