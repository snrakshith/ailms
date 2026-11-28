# G05: Agent design patterns

## Module map

```mermaid
flowchart TD
    N1["Goal"]
    N2["Decide action"]
    N3["Validate and authorize"]
    N4["Execute"]
    N5["Observe"]
    N6["Result"]
    N7["Stop"]
    N1 --> N2
    N2 -->|tool| N3
    N3 --> N4
    N4 --> N5
    N5 --> N2
    N2 -->|final| N6
    N2 -->|budget| N7
```

## Lessons

- [Tool calling and tool-use agent pattern](G05-L01.md) — intermediate
- [ReAct, planning and action-observation loops](G05-L02.md) — intermediate
- [Reflection and evaluator-optimizer agents](G05-L03.md) — intermediate
- [Multi-agent systems and orchestration](G05-L04.md) — advanced

Complete each exercise and demonstrate the related module examples.
