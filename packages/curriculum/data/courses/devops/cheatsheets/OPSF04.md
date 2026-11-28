# Container engineering — quick reference

## Docker images and containers

Images are layered filesystems and configuration; containers are running processes isolated by OS mechanisms. Multi-stage builds separate tooling from runtime; use nonroot users and small trusted base images.

**Watch for:** A container is not a VM-level security boundary; never bake secrets into layers.

## Container networking, volumes and Compose

Container network namespaces isolate interfaces; service discovery resolves names on shared networks. Volumes survive container replacement while writable layers do not. Compose models local multi-service dependencies.

**Watch for:** depends_on alone does not guarantee readiness; publishing all ports broadens exposure.
