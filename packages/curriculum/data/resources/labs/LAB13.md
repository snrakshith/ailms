# LAB13 — Rolling demand forecast

**Lesson:** M05-L01

## Goal

Use synthetic retail CSV for three chronological backtests.

## Setup

Use the core environment; additional packages: numpy. Run commands from archive root.

## Steps

1. Read `content/M/M05/M05-L01.md` and the task below.
2. Run `python labs/starters/LAB13.py`. The TODO is intentional. Implement the missing contract in the starter; keep the provided fixtures and assertions where available.
3. Compare seasonal-naive and moving-average MAE at fixed horizons.
4. Run the completed starter and inspect output. Add one independent boundary or failure case before submitting.
5. Compare to `labs/solutions/LAB13.py` after submission; run `python labs/solutions/LAB13.py` to reproduce the reference.

## Acceptance criteria

Every forecast follows training cutoff; no future features.

## Submission

Source, test log, output/metrics, and a short limitation statement.

## Extension

Change a seed, input or boundary condition, then explain the result. Do not tune on the held-out test.
