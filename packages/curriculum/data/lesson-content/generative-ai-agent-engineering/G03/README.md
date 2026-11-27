# G03: RAG foundations

## Module map
```mermaid
flowchart TD
    N1["Documents"]
    N2["Chunk and embed"]
    N3["Index"]
    N4["Query"]
    N5["Retrieve"]
    N6["Rerank"]
    N7["Evidence"]
    N8["Generate"]
    N9["Cite"]
    N1 --> N2
    N2 --> N3
    N4 --> N5
    N5 --> N6
    N6 --> N7
    N7 --> N8
    N8 --> N9
    N3 --> N5
```

## Lessons
- [Embeddings, similarity and vector databases](G03-L01.md) — beginner
- [RAG ingestion, chunking and indexing](G03-L02.md) — intermediate
- [RAG retrieval, reranking and answer grounding](G03-L03.md) — intermediate
- [RAG evaluation and retrieval diagnostics](G03-L04.md) — intermediate

Complete each exercise and demonstrate the related module examples.
