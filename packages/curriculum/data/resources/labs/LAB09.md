# LAB09 — HITL and idempotency contract

**Lesson:** G06-L04

## Goal

Use SQLite receipt keys to reject unauthorized writes and replay duplicate requests.

## Setup

Use the core environment; additional packages: standard library only. Run commands from archive root.

## Steps

1. Read `content/G/G06/G06-L04.md` and the task below.
2. Run `python labs/starters/LAB09.py`. The TODO is intentional. Implement the missing contract in the starter; keep the provided fixtures and assertions where available.
3. Verify deny, approve, duplicate, conflicting payload and stored row count.
4. Run the completed starter and inspect output. Add one independent boundary or failure case before submitting.
5. Compare to `labs/solutions/LAB09.py` after submission; run `python labs/solutions/LAB09.py` to reproduce the reference.

## Acceptance criteria

Only one authorized fixture receipt persisted; actual external exactly-once not claimed.

## Submission

Source, test log, output/metrics, and a short limitation statement.

## Extension

Change a seed, input or boundary condition, then explain the result. Do not tune on the held-out test.
