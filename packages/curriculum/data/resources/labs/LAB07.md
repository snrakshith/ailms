# LAB07 — Grounded retrieval and abstention

**Lesson:** G03-L04

## Goal
Use lexical retrieval against synthetic tenant-scoped policy corpus.

## Setup
Use the core environment; additional packages: standard library only. Run commands from archive root.

## Steps
1. Read `content/G/G03/G03-L04.md` and the task below.
2. Run `python labs/starters/LAB07.py`. The TODO is intentional. Implement the missing contract in the starter; keep the provided fixtures and assertions where available.
3. Run fixture queries; add paraphrases and inspect false abstains. Compare a better retriever on a new holdout.
4. Run the completed starter and inspect output. Add one independent boundary or failure case before submitting.
5. Compare to `labs/solutions/LAB07.py` after submission; run `python labs/solutions/LAB07.py` to reproduce the reference.

## Acceptance criteria
16 known fixtures pass; exact-match-like lexical benchmark is not real semantic evaluation.

## Submission
Source, test log, output/metrics, and a short limitation statement.

## Extension
Change a seed, input or boundary condition, then explain the result. Do not tune on the held-out test.
