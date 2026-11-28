# LAB03 — Cross-validated regression

**Lesson:** M03-L02

## Goal

Compare median baseline with ridge penalties using development folds.

## Setup

Use the core environment; additional packages: scikit-learn. Run commands from archive root.

## Steps

1. Read `content/M/M03/M03-L02.md` and the task below.
2. Run `python labs/starters/LAB03.py`. The TODO is intentional. Implement the missing contract in the starter; keep the provided fixtures and assertions where available.
3. Record CV MAE, selected candidate and independent test MAE.
4. Run the completed starter and inspect output. Add one independent boundary or failure case before submitting.
5. Compare to `labs/solutions/LAB03.py` after submission; run `python labs/solutions/LAB03.py` to reproduce the reference.

## Acceptance criteria

Select minimum development MAE; no test-based selection. Educational benchmark only.

## Submission

Source, test log, output/metrics, and a short limitation statement.

## Extension

Change a seed, input or boundary condition, then explain the result. Do not tune on the held-out test.
