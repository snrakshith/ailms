# Fault injection

Test a MongoDB outage (readiness returns 503), a Redis outage when cache/queue are enabled, graceful SIGTERM and worker restarts, while tracking trace IDs and error ratios. Unit tests for circuit breaker/retry/bulkhead live in apps/api/tests.
