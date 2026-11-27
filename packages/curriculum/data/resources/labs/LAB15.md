# LAB15 — Tool contract before MCP transport

**Lesson:** G07-L02

## Goal
Build strict read-only catalog tool dispatch.

## Setup
Use the core environment; additional packages: pydantic. Run commands from archive root.

## Steps
1. Read `content/G/G07/G07-L02.md` and the task below.
2. Run `python labs/starters/LAB15.py`. The TODO is intentional. Implement the missing contract in the starter; keep the provided fixtures and assertions where available.
3. Test valid input, invalid schema, unknown tool, missing scope and record not found.
4. Run the completed starter and inspect output. Add one independent boundary or failure case before submitting.
5. Compare to `labs/solutions/LAB15.py` after submission; run `python labs/solutions/LAB15.py` to reproduce the reference.

## Acceptance criteria
Five contract cases pass. Actual MCP integration remains separate.

## Submission
Source, test log, output/metrics, and a short limitation statement.

## Extension
Change a seed, input or boundary condition, then explain the result. Do not tune on the held-out test.
