# P01: MLOps and delivery engineering

## Module map
```mermaid
flowchart TD
    N1["Code + data + config"]
    N2["CI tests"]
    N3["Train and evaluate"]
    N4["Registry"]
    N5["Approval"]
    N6["Staged deploy"]
    N1 --> N2
    N2 --> N3
    N3 --> N4
    N4 --> N5
    N5 --> N6
```

## Lessons
- [Model packaging, APIs and Docker](P01-L01.md) — intermediate
- [MLflow, data versioning and experiment tracking](P01-L02.md) — intermediate
- [CI/CD, continuous training and DevSecOps](P01-L03.md) — advanced

Complete each exercise and demonstrate the related module examples.
