# Docker images and containers

**Level:** beginner · **Estimated time:** 90 min · **ID:** `OPSF04-L01`

## Learning objectives
- Explain the mechanism behind Docker images and containers.
- Implement or demonstrate: Build the supplied local service image and run it on loopback.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning
Images are layered filesystems and configuration; containers are running processes isolated by OS mechanisms. Multi-stage builds separate tooling from runtime; use nonroot users and small trusted base images.

## Worked example
A Python service can run from an image with only application files and runtime dependencies.

## Common failure mode
A container is not a VM-level security boundary; never bake secrets into layers.

## Implementation snippet
```bash
docker build -t learning-api:local .
docker run --rm --read-only --cap-drop ALL -p 127.0.0.1:8080:8080 learning-api:local
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise
Build the supplied local service image and run it on loopback.

## Completion checklist
- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Docker images and containers using the worked scenario.

## Knowledge check
1. Explain the mechanism of Docker images and containers using the worked scenario.
2. What failure should you watch for in Docker images and containers, and how would you detect or prevent it?

## Review resources
- https://docs.docker.com/build/building/best-practices/
