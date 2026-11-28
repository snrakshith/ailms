# LAB10 — FastAPI validation and streaming

**Lesson:** G09-L01

## Goal

Create a fake inference API and SSE endpoint.

## Setup

Use the core environment; additional packages: fastapi,pydantic,httpx. Run commands from archive root.

## Steps

1. Read `content/G/G09/G09-L01.md` and the task below.
2. Run `python labs/starters/LAB10.py`. The TODO is intentional. Implement the missing contract in the starter; keep the provided fixtures and assertions where available.
3. Exercise successful request, invalid body, timeout, unavailable provider and event framing.
4. Run the completed starter and inspect output. Add one independent boundary or failure case before submitting.
5. Compare to `labs/solutions/LAB10.py` after submission; run `python labs/solutions/LAB10.py` to reproduce the reference.

## Acceptance criteria

200,422,504,503 and valid SSE; live cancellation is a separate exercise.

## Submission

Source, test log, output/metrics, and a short limitation statement.

## Extension

Change a seed, input or boundary condition, then explain the result. Do not tune on the held-out test.
