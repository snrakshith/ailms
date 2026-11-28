# Database operations

In production, Mongoose autoIndex is disabled. Roll out schema changes and indexes with a controlled migration job before API rollout. Define unique user email index and task compound tenantId/_id and tenantId/status/_id index; see `apps/api/src/infrastructure/database/mongodb/models.ts`. See MongoDB backup/restore runbook under deployment docs.
