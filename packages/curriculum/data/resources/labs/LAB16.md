# LAB16 — RAG evaluation metric decomposition

**Lesson:** G10-L01

## Goal
Calculate evidence recall, abstention and human-labeled claim support separately.

## Setup
Use the core environment; additional packages: standard library only. Run commands from archive root.

## Steps
1. Read `content/G/G10/G10-L01.md` and the task below.
2. Run `python labs/starters/LAB16.py`. The TODO is intentional. Implement the missing contract in the starter; keep the provided fixtures and assertions where available.
3. Use three fixture cases and explain why metrics diverge.
4. Run the completed starter and inspect output. Add one independent boundary or failure case before submitting.
5. Compare to `labs/solutions/LAB16.py` after submission; run `python labs/solutions/LAB16.py` to reproduce the reference.

## Acceptance criteria
Recall .5, abstention 1, support 1/3; no model judge.

## Submission
Source, test log, output/metrics, and a short limitation statement.

## Extension
Change a seed, input or boundary condition, then explain the result. Do not tune on the held-out test.
