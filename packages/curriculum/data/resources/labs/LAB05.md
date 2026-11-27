# LAB05 — CPU CNN on handwritten digits

**Lesson:** C02-L02

## Goal
Train a small CNN on 8x8 digit images and save best validation checkpoint.

## Setup
Use the core environment; additional packages: torch,scikit-learn. Run commands from archive root.

## Steps
1. Read `content/C/C02/C02-L02.md` and the task below.
2. Run `python labs/starters/LAB05.py`. The TODO is intentional. Implement the missing contract in the starter; keep the provided fixtures and assertions where available.
3. Record validation and holdout macro F1, parameter count, and confusion analysis extension.
4. Run the completed starter and inspect output. Add one independent boundary or failure case before submitting.
5. Compare to `labs/solutions/LAB05.py` after submission; run `python labs/solutions/LAB05.py` to reproduce the reference.

## Acceptance criteria
Model returns 10 logits; test F1 between 0 and 1. Compare architecture on validation only.

## Submission
Source, test log, output/metrics, and a short limitation statement.

## Extension
Change a seed, input or boundary condition, then explain the result. Do not tune on the held-out test.
