# Grounded knowledge assistant with tools

Implement a knowledge assistant over synthetic policies.

## Deliverables

- [ ] Ingestion and citations
- [ ] sparse and dense retrieval
- [ ] bounded corrective loop
- [ ] read-only MCP tool
- [ ] LangGraph workflow
- [ ] typed output
- [ ] scoped memory
- [ ] SSE endpoint
- [ ] gateway config
- [ ] evaluation gate

## Acceptance criteria

Unanswerable queries abstain; unauthorized actions never execute; retries bounded; user isolation tested; offline and opt-in judge suites separate.

## Grading rubric (100 points)

- Functional Correctness: 30
- Evaluation And Evidence: 30
- Reproducibility And Documentation: 20
- Safety And Reliability: 20

Suggested pass: 75/100, with no unresolved critical safety or data leakage issue. Submit repository, test output and evaluation report.
