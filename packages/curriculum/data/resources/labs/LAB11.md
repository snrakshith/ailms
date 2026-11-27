# LAB11 — LoRA adapter mechanics

**Lesson:** G11-L01

## Goal
Train rank-2 adapter on a frozen linear layer.

## Setup
Use the core environment; additional packages: torch. Run commands from archive root.

## Steps
1. Read `content/G/G11/G11-L01.md` and the task below.
2. Run `python labs/starters/LAB11.py`. The TODO is intentional. Implement the missing contract in the starter; keep the provided fixtures and assertions where available.
3. Compare loss and confirm base tensor unchanged; calculate parameter count for larger layer.
4. Run the completed starter and inspect output. Add one independent boundary or failure case before submitting.
5. Compare to `labs/solutions/LAB11.py` after submission; run `python labs/solutions/LAB11.py` to reproduce the reference.

## Acceptance criteria
Training loss decreases, base weight unchanged; tiny toy rank is not parameter-efficient.

## Submission
Source, test log, output/metrics, and a short limitation statement.

## Extension
Change a seed, input or boundary condition, then explain the result. Do not tune on the held-out test.
