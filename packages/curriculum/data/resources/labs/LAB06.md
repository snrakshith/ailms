# LAB06 — Bounding box IoU and class-aware NMS

**Lesson:** C03-L01

## Goal
Calculate overlap and suppress duplicate same-class detections.

## Setup
Use the core environment; additional packages: numpy. Run commands from archive root.

## Steps
1. Read `content/C/C03/C03-L01.md` and the task below.
2. Run `python labs/starters/LAB06.py`. The TODO is intentional. Implement the missing contract in the starter; keep the provided fixtures and assertions where available.
3. Verify identical, disjoint, partial overlap, and different classes.
4. Run the completed starter and inspect output. Add one independent boundary or failure case before submitting.
5. Compare to `labs/solutions/LAB06.py` after submission; run `python labs/solutions/LAB06.py` to reproduce the reference.

## Acceptance criteria
Partial overlap 1/7; duplicate same class suppressed; other class retained.

## Submission
Source, test log, output/metrics, and a short limitation statement.

## Extension
Change a seed, input or boundary condition, then explain the result. Do not tune on the held-out test.
