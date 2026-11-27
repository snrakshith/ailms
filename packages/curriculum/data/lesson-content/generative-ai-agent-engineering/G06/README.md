# G06: LangChain and LangGraph orchestration

## Module map
```mermaid
flowchart TD
    N1["Start"]
    N2["Router"]
    N3["Parallel A"]
    N4["Parallel B"]
    N5["Merge"]
    N6["Review"]
    N7["End"]
    N1 --> N2
    N2 -->|valid| N3
    N2 -->|valid| N4
    N3 --> N5
    N4 --> N5
    N5 --> N6
    N6 -->|retry| N2
    N6 -->|approved| N7
    N2 -->|invalid| N7
```

## Lessons
- [LangChain components and integration boundaries](G06-L01.md) — intermediate
- [LangGraph state, nodes, edges and sequential workflow](G06-L02.md) — intermediate
- [LangGraph conditional and parallel workflows](G06-L03.md) — intermediate
- [LangGraph iterative workflows, checkpointing and HITL](G06-L04.md) — advanced

Complete each exercise and demonstrate the related module examples.

## Extended study guide
[ Workflow patterns and state contracts ](../../../guides/G06-deep-dive.md)
