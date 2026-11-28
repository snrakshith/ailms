# G04: Advanced RAG patterns

## Module map

```mermaid
flowchart TD
    N1["Query"]
    N2["Retrieve"]
    N3["Grade evidence"]
    N4["Rewrite or fallback"]
    N5["Generate"]
    N6["Verify"]
    N7["Answer"]
    N8["Abstain"]
    N1 --> N2
    N2 --> N3
    N3 -->|weak| N4
    N4 --> N2
    N3 -->|strong| N5
    N5 --> N6
    N6 -->|unsupported| N4
    N6 -->|pass| N7
    N6 -->|budget exhausted| N8
```

## Lessons

- [Self-reflective RAG and Self-RAG](G04-L01.md) — advanced
- [Corrective RAG (CRAG)](G04-L02.md) — advanced
- [Self-corrective RAG and iterative verification](G04-L03.md) — advanced
- [Agentic RAG and routing](G04-L04.md) — advanced

Complete each exercise and demonstrate the related module examples.

## Extended study guide

[ RAG pattern comparison and worked trace ](../../../guides/G04-deep-dive.md)
