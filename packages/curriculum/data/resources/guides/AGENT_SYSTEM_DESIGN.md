# Advanced design: RAG, agents and dependable tool use

## Choosing the simplest architecture

A deterministic lookup answers a structured question with known inputs. Basic RAG retrieves evidence before a generated answer. A corrective pipeline adds evidence quality checks and alternate retrieval. Agentic RAG makes retrieval and tool selection adaptive. The extra control flow is justified only when benchmarked improvements outweigh latency, cost and risk. Use a fixed graph for well-defined paths; use a bounded agent when intermediate observations genuinely change the next step. Reflection and multi-agent consensus do not guarantee truth.

## State contract

Track request ID, authenticated tenant, allowed tool scopes, normalized input, retrieved evidence IDs and revisions, draft output, verification result, retry count, elapsed budget, approval decision and terminal status. Keep sensitive payloads out of generic telemetry. The model proposes a tool; policy checks the authenticated identity, capability and arguments. A resource or tool response is untrusted content. Never derive permission from a retrieved document or model-generated text. Each node should be independently testable with fake inputs and deterministic outputs. For parallel branches, merge by stable worker/record ID; define conflicts rather than relying on completion order.

## Evidence and correction

Use document IDs, revision and offsets so a claim can be traced to the exact evidence. Retrieval scoring and claim verification are separate stages: high similarity can return a stale or contradictory source. A corrective retrieval router may use primary evidence, rerank merged evidence, or consult an authorized fallback. A self-correction loop verifies the draft against evidence and stops on success, unchanged evidence, attempt/time limit or abstention. Self-RAG and CRAG refer to specific research methods; these pedagogical routers illustrate related patterns rather than reproducing their training pipelines.

## Human approval and recovery

Human review is required for designated protected actions, not every read. Persist approval against exact action payload and identity; reject mismatched or expired approval. Store idempotency keys with effects transactionally where possible. An interrupt/resume or checkpoint does not prove an external service executed once. Use durable receipts, idempotent external APIs or reconciliation. Include tool timeout, duplicate resume, malformed argument, conflicting evidence, missing fallback and unavailable policy service in failure tests. Fail closed for authorization errors; a bounded retry is appropriate only for explicitly retryable errors.

## Evaluation hierarchy

First test deterministic contracts: schema, source IDs, authorization, stop limits, replay and cancellation. Next evaluate retrieval recall, grounded correctness and abstention on a labeled independent dataset. Add model-based evaluation only with calibrated judge prompts and human anchors. Report false acceptance, cost, tool counts and latency distributions. Compare one-pass vs reflection, deterministic routing vs agent, and single agent vs specialists while holding test cases and budgets fixed.

## Practical connection

LAB07/08 show retrieval and bounded correction; LAB09 demonstrates a local approval and replay contract; LAB14/15 enforce memory and tool boundaries; LAB16 decomposes evaluation. These mocks do not validate LangGraph, Mem0, FastMCP or real provider behavior. Use `review/INTEGRATION_TEST_PLAN.md` for those integration checks.
