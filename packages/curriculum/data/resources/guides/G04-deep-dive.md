# RAG pattern comparison and worked trace

| Pattern                         | Main decision               | Corrective action                             | Appropriate use               |
| ------------------------------- | --------------------------- | --------------------------------------------- | ----------------------------- |
| Basic RAG                       | Retrieve once               | Abstain if unsupported                        | Stable single-hop queries     |
| Self-reflective application RAG | Grade relevance and output  | Revise or retrieve again                      | Evidence checks               |
| Original Self-RAG               | Learned reflection tokens   | Model-controlled retrieval and critique       | Research/model-level approach |
| CRAG-inspired                   | Grade retrieval quality     | Refine, alternative approved corpus or search | Incomplete retrieval          |
| Self-corrective RAG             | Verify generated claims     | Revise unsupported claims or retrieve         | Answer-level failures         |
| Agentic RAG                     | Choose tool/source/subquery | Decompose and route                           | Multi-source or multi-hop     |

## Worked scenario

Question: “Can I claim a taxi without a receipt?” Corpus A contains general travel rules, corpus B contains an exception policy. Initial lexical retrieval returns only general rules. A relevance judge marks the result incomplete; a bounded rewrite targets taxi receipt exceptions. An approved second corpus returns a policy exception with an ID and effective date. The generator drafts an answer with both evidence IDs. A verifier checks each claim against the text, including the date. If the exception evidence is absent, answer with the supported general rule and flag the missing exception rather than guessing. Limit attempts, source scope, latency and tokens; maintain tenant filtering for every retrieval path.

## Metrics

Recall@k = relevant retrieved / total relevant; precision@k = relevant retrieved / k (state convention for fewer results); MRR = mean reciprocal rank of first relevant result, with 0 if absent. Answer faithfulness is a claim-level support concept, distinct from correctness. Track abstention on unanswerable questions and false abstention on answerable questions. Use human-reviewed labels and compare against one-pass baseline.

**Implementation path:** start with `rag_retrieval.py`; add a dense adapter; add `bounded_corrective_rag.py`; replace the mock grade with a validated rubric and a human-reviewed evaluation set; then map transitions to LangGraph. Original papers are linked in the module; this controller is not a reproduction of their trained methods.
