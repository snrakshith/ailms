# LAB08 — Bounded corrective retrieval and claim verification

**Lesson:** G04-L02

## Goal
Implement three evidence routes and retry-bounded fact verifier.

## Setup
Use the core environment; additional packages: standard library only. Run commands from archive root.

## Steps
1. Read `content/G/G04/G04-L02.md` and the task below.
2. Run `python labs/starters/LAB08.py`. The TODO is intentional. Implement the missing contract in the starter; keep the provided fixtures and assertions where available.
3. Test weak/ambiguous/strong evidence, missing fallback and permanent failure.
4. Run the completed starter and inspect output. Add one independent boundary or failure case before submitting.
5. Compare to `labs/solutions/LAB08.py` after submission; run `python labs/solutions/LAB08.py` to reproduce the reference.

## Acceptance criteria
Max 3 attempts; evidence mismatch abstains or corrects. Inspired by CRAG, not paper reproduction.

## Submission
Source, test log, output/metrics, and a short limitation statement.

## Extension
Change a seed, input or boundary condition, then explain the result. Do not tune on the held-out test.
