# LAB01 — Standardization without NaN

**Lesson:** F01-L03

## Goal

Implement column statistics and zero-variance guard.

## Setup

Use the core environment; additional packages: numpy. Run commands from archive root.

## Steps

1. Read `content/F/F01/F01-L03.md` and the task below.
2. Run `python labs/starters/LAB01.py`. The TODO is intentional. Implement the missing contract in the starter; keep the provided fixtures and assertions where available.
3. Compare output with a constant column and assert shape, mean and variance.
4. Run the completed starter and inspect output. Add one independent boundary or failure case before submitting.
5. Compare to `labs/solutions/LAB01.py` after submission; run `python labs/solutions/LAB01.py` to reproduce the reference.

## Acceptance criteria

Constant column output is zero; other columns have mean 0 and std 1.

## Submission

Source, test log, output/metrics, and a short limitation statement.

## Extension

Change a seed, input or boundary condition, then explain the result. Do not tune on the held-out test.
