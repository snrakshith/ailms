# Workflow patterns and state contracts

| Pattern       | Graph shape                             | When to choose          | Critical invariant                    |
| ------------- | --------------------------------------- | ----------------------- | ------------------------------------- |
| Sequential    | A → B → C                               | Known stages            | Each step consumes validated state    |
| Conditional   | Router → A or B                         | Route based on input    | All branches end or rejoin            |
| Parallel      | Fan-out A/B → merge                     | Independent specialists | Reducer merges without losing updates |
| Iterative     | Draft → grade → revise or end           | Bounded improvement     | Termination and budget                |
| Human-in-loop | Propose → interrupt → approved/rejected | Sensitive actions       | No action before authorization        |

State contract example: `query`, `tenant_id` (trusted runtime identity), `retrieved_ids`, `draft`, `attempt_count`, `budget_remaining`, `approval_status`, `termination_reason`. Never allow the model to assign trusted identity or approval. Use deterministic routers for strict policy and LLM routers only for semantic decisions. Track graph thread IDs independently of user IDs. Persistent checkpoint data needs access control and retention; resume can replay a node, so external side effects need a durable idempotency key. Use the supplied sequential, parallel and HITL examples as version-sensitive starters.

## Tests

- Empty query terminates without calling tools.
- Two branches produce evidence and merge exactly once.
- A failed grade triggers a bounded retry and eventually abstains.
- Reject and timeout paths do not execute a write.
- Repeated resume does not duplicate an already authorized write.
- Exceptions produce sanitized errors and trace IDs.

**Design exercise:** map a supervisor-worker agent to a graph; show how you would replace a worker with a deterministic function if it improves reliability. Compare tool-call count, p95 latency and quality against one-pass execution.
