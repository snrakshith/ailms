# Container engineering

Study in this order; each section contains an independent lesson.

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

---

# Container networking, volumes and Compose

**Level:** beginner · **Estimated time:** 90 min · **ID:** `OPSF04-L02`

## Learning objectives

- Explain the mechanism behind Container networking, volumes and Compose.
- Implement or demonstrate: Run the learning API with Compose and inspect its logs and service health.
- Identify the failure mode and explain the verification evidence.

## Concept and design reasoning

Container network namespaces isolate interfaces; service discovery resolves names on shared networks. Volumes survive container replacement while writable layers do not. Compose models local multi-service dependencies.

## Worked example

An app inside a container reaches another service by its Compose service name, not localhost.

## Common failure mode

depends_on alone does not guarantee readiness; publishing all ports broadens exposure.

## Implementation snippet

```bash
docker compose config
docker compose up -d
docker compose logs --tail=30
docker compose down
```

Tool commands are illustrative, environment-dependent; review placeholders, install verified versions, and run only in an authorized disposable environment.

## Hands-on exercise

Run the learning API with Compose and inspect its logs and service health.

## Completion checklist

- [ ] Meet the stated input/output or operational contract.
- [ ] Demonstrate one normal and one boundary/failure case.
- [ ] Explain the invariant or evidence and the limitation.
- [ ] Explain: Explain the mechanism of Container networking, volumes and Compose using the worked scenario.

## Knowledge check

1. Explain the mechanism of Container networking, volumes and Compose using the worked scenario.
2. What failure should you watch for in Container networking, volumes and Compose, and how would you detect or prevent it?

## Review resources

- https://docs.docker.com/compose/
