# LAB14 — Scoped memory lifecycle

**Lesson:** G08-L02

## Goal

Implement isolated memory records and expiry.

## Setup

Use the core environment; additional packages: standard library only. Run commands from archive root.

## Steps

1. Read `content/G/G08/G08-L02.md` and the task below.
2. Run `python labs/starters/LAB14.py`. The TODO is intentional. Implement the missing contract in the starter; keep the provided fixtures and assertions where available.
3. Test add/update/search/delete, expiry and cross-tenant denial.
4. Run the completed starter and inspect output. Add one independent boundary or failure case before submitting.
5. Compare to `labs/solutions/LAB14.py` after submission; run `python labs/solutions/LAB14.py` to reproduce the reference.

## Acceptance criteria

No cross-tenant access; expired/deleted entries excluded. Not a vector DB or Mem0 test.

## Submission

Source, test log, output/metrics, and a short limitation statement.

## Extension

Change a seed, input or boundary condition, then explain the result. Do not tune on the held-out test.
