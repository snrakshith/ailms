# G09: LLM APIs, gateways and guardrails

## Module map
```mermaid
flowchart TD
    N1["Client"]
    N2["FastAPI"]
    N3["Input policy"]
    N4["LiteLLM gateway"]
    N5["Model"]
    N6["Output checks"]
    N7["SSE client"]
    N8["Human approval for writes"]
    N1 --> N2
    N2 --> N3
    N3 --> N4
    N4 --> N5
    N5 --> N6
    N6 --> N7
    N3 --> N8
```

## Lessons
- [FastAPI, Pydantic and async inference APIs](G09-L01.md) — intermediate
- [Streaming responses: SSE, chunks and cancellation](G09-L02.md) — intermediate
- [LiteLLM gateway, routing and fallback](G09-L03.md) — intermediate
- [Guardrails, prompt injection, privacy and HITL](G09-L04.md) — advanced

Complete each exercise and demonstrate the related module examples.
