# Production operations — quick reference

## Disaster recovery, backup and rollback

RPO bounds data loss; RTO bounds recovery time. Backups need restoration tests; rollback may not reverse database schema changes. Use backward-compatible expand/contract migrations.

**Watch for:** Snapshots without tested restoration give false confidence.

## Progressive delivery and quality gates

Canary decisions compare candidate error rate/latency against baseline with minimum sample size. Promotion requires approved metrics, signature and scan evidence; rollback has predefined triggers.

**Watch for:** Do not promote solely because no alerts fired; unknown evidence fails closed.

## Platform engineering and golden paths

A golden path combines reusable templates, secure defaults, documentation and ownership. Self-service interfaces expose a supported contract; exceptions are governed rather than copying pipelines across teams.

**Watch for:** Overly rigid templates encourage bypasses; version and support migration paths.

## End-to-end DevSecOps capstone

Integrate code review, tests, build, SAST/SCA/secrets, SBOM and signing, GitOps deploy, DAST, metrics and incident response. Each gate must have evidence, identity, owner and failure handling.

**Watch for:** A monolithic privileged job defeats separation of duties and makes rollback ambiguous.
