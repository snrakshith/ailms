# M01: ML lifecycle and data preparation

## Module map

```mermaid
flowchart TD
    N1["Raw data"]
    N2["Split"]
    N3["Fit preprocessing on train"]
    N4["Fit model"]
    N5["Validation"]
    N6["Held-out test"]
    N1 --> N2
    N2 --> N3
    N3 --> N4
    N4 --> N5
    N5 --> N6
```

## Lessons

- [ML problem framing and baselines](M01-L01.md) — beginner
- [Train, validation, test and leakage](M01-L02.md) — beginner
- [Preprocessing and feature pipelines](M01-L03.md) — intermediate

Complete each exercise and demonstrate the related module examples.
