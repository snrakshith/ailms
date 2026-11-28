# ELK and structured logging

**Level:** intermediate · **Estimated time:** 90 min · **ID:** `OPSF08-L03`

## Learning objectives
- Explain the mechanism behind ELK and structured logging.
- Implement or demonstrate: Parse synthetic JSON logs and locate error requests by correlation ID.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Elasticsearch indexes events, Logstash transforms/ships data and Kibana queries/visualizes it. Structured JSON logs should include timestamp, severity, service and trace ID; redact personal and secret data.

## Worked example
A 500 error can be connected to a trace ID across services.

## Common failure mode
Do not log authorization headers or unbounded payloads; index retention matters.

## Implementation snippet
Try the lab before opening the solution.

```bash
python -c 'import json; print(json.dumps({"service":"api","level":"ERROR","trace_id":"demo-123"}))'
```

Executable reference: see lab and solution files.

## Hands-on exercise
Parse synthetic JSON logs and locate error requests by correlation ID.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of ELK and structured logging using the worked scenario.

## Knowledge check
1. Explain the mechanism of ELK and structured logging using the worked scenario.
2. What failure should you watch for in ELK and structured logging, and how would you detect or prevent it?

## Review resources
- https://www.elastic.co/guide/index.html
