# OWASP ZAP and Burp Suite DAST

**Level:** advanced · **Estimated time:** 120 min · **ID:** `OPSS05-L01`

## Learning objectives
- Explain the mechanism behind OWASP ZAP and Burp Suite DAST.
- Implement or demonstrate: Run a baseline against your loopback lab app or approved disposable target.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
DAST examines running application behavior with HTTP traffic. ZAP baseline is passive-oriented plus spidering; active scanning can change state. Burp Suite supports manual proxy-based testing and licensed scanning. Test only owned authorized labs.

## Worked example
Missing security headers can be found via passive analysis; authenticated checks need test users and scoped sessions.

## Common failure mode
Do not point scanners at production or public third-party hosts without authorization.

## Implementation snippet
```bash
# With a verified ZAP installation; local service only
zap-baseline.py -t http://127.0.0.1:8080 -r zap-report.html
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise
Run a baseline against your loopback lab app or approved disposable target.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of OWASP ZAP and Burp Suite DAST using the worked scenario.

## Knowledge check
1. Explain the mechanism of OWASP ZAP and Burp Suite DAST using the worked scenario.
2. What failure should you watch for in OWASP ZAP and Burp Suite DAST, and how would you detect or prevent it?

## Review resources
- https://www.zaproxy.org/docs/docker/baseline-scan/
- https://portswigger.net/burp/documentation
