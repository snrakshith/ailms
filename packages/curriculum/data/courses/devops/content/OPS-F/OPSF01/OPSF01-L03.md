# Networking, DNS, HTTP and TLS

**Level:** beginner · **Estimated time:** 90 min · **ID:** `OPSF01-L03`

## Learning objectives
- Explain the mechanism behind Networking, DNS, HTTP and TLS.
- Implement or demonstrate: Trace a local HTTP endpoint and distinguish connection error from HTTP error.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
DNS resolves names, TCP establishes transport, TLS authenticates endpoints and encrypts traffic, HTTP carries requests. Separate name lookup, connectivity, TLS and app status when debugging.

## Worked example
A 502 from a proxy indicates it answered HTTP, unlike a DNS failure or TCP timeout.

## Common failure mode
Do not disable certificate verification to fix trust errors.

## Implementation snippet
```bash
python -m http.server 8080 --bind 127.0.0.1
# separate terminal
curl --fail --max-time 3 -i http://127.0.0.1:8080/
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise
Trace a local HTTP endpoint and distinguish connection error from HTTP error.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Networking, DNS, HTTP and TLS using the worked scenario.

## Knowledge check
1. Explain the mechanism of Networking, DNS, HTTP and TLS using the worked scenario.
2. What failure should you watch for in Networking, DNS, HTTP and TLS, and how would you detect or prevent it?

## Review resources
- https://curl.se/docs/manpage.html
