# LAB02 — Capacity-aware classification

**Lesson:** M02-L02

## Goal
Load Wisconsin benchmark and select threshold under validation review capacity.

## Setup
Use the core environment; additional packages: scikit-learn,numpy. Run commands from archive root.

## Steps
1. Read `content/M/M02/M02-L02.md` and the task below.
2. Run `python labs/starters/LAB02.py`. The TODO is intentional. Implement the missing contract in the starter; keep the provided fixtures and assertions where available.
3. Compare validation precision/recall at several thresholds, freeze threshold, evaluate test once.
4. Run the completed starter and inspect output. Add one independent boundary or failure case before submitting.
5. Compare to `labs/solutions/LAB02.py` after submission; run `python labs/solutions/LAB02.py` to reproduce the reference.

## Acceptance criteria
Validation review fraction <= 0.4; test may differ. Educational benchmark only, not clinical use.

## Submission
Source, test log, output/metrics, and a short limitation statement.

## Extension
Change a seed, input or boundary condition, then explain the result. Do not tune on the held-out test.
