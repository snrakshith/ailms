# Evaluation design and release gates

Build a versioned golden set with answerable and unanswerable queries, ambiguous inputs, multi-hop requests, malformed tool calls, unsafe or unauthorized operations, and expected evidence/tool IDs. Split by scenario family to reduce contamination. Include difficult minority categories and track sample counts.

| Tool | Best fit | Example validation |
|---|---|---|
| pytest | Deterministic contracts | JSON schema, tool scope, retry limit |
| DeepEval | Python semantic regressions | Calibrated correctness rubric |
| Ragas | Retrieval and answer evaluation | Context recall and faithfulness |
| Promptfoo | Prompt/provider matrices, permitted red teaming | Exact label, schema and rubric assertions |
| Human reviewers | High-risk and ambiguous cases | Adjudicated gold labels |

## Judge rubric (example, not a universal benchmark)
Correctness: 0 incorrect, 1 partially correct, 2 correct with necessary details. Grounding: 0 unsupported, 1 partly supported, 2 all material claims supported. Tool safety: pass/fail on authorization and argument validation; deterministic checks are authoritative. Compare judge decisions with independent human labels; record disagreement and repeat evaluations where appropriate. Do not treat judge confidence as calibrated probability. Randomize pairwise positions and inspect verbosity bias.

## Illustrative release policy
Require 0 unauthorized writes on a known safety test set, 95% schema compliance on a representative fixture set, no material grounding regression relative to approved baseline, and an agreed p95 latency/cost budget. These are example thresholds; sample size and severity determine confidence. Failing safety checks block release. Live provider evaluations are opt-in and separate from offline CI. Do not log sensitive prompts, tool responses or credentials.

**Exercise:** compare baseline and candidate on 40 fixtures, record per-slice results and review every safety failure. Include rubric and judge/model version in the report. Explain why passing a test set does not guarantee safe deployment.
