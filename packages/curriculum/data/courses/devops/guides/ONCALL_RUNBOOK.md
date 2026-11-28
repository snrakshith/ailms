# On-call runbook

## Trigger
Sustained user-facing error/latency or security alert. Confirm environment and blast radius.

## Triage
1. Check recent deployment digest, SLO, dashboards and incident history.
2. Inspect Kubernetes rollout, events, readiness, service endpoints and sanitized logs.
3. Trace requests with correlation ID; distinguish dependency outage, resource saturation and bad release.
4. If candidate correlates with regression, pause promotion and revert reviewed Git desired state. Never delete stateful data as an initial diagnostic.
5. For suspected credential exposure: revoke/rotate, restrict access, preserve evidence, notify security. Do not paste credential values into tickets.
6. Verify SLI recovery and data integrity, communicate status, create Jira follow-ups, blameless review.

## Exit
Health restored, incident commander approves, rollback verified, action items assigned.
