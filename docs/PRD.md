# PRD — AI Quest developer-to-AI learning MVP

**Version:** 0.2 implementation baseline · **Audience:** engineers, product and content authors · **State:** P0 scope implemented

## Problem

A software developer transitioning into AI often encounters fragmented material: high-level articles, heavy mathematics and unstructured playgrounds with no reliable mastery signal. Our product should make the transition approachable, fast to begin and demonstrably educational.

## Product thesis

> Help developers leverage existing programming intuition to understand and build AI systems through short lessons, scenario-based assessments and transparent progress tracking.

The differentiation is **learning quality first**, not gamification for its own sake. The completion signal is a passed knowledge check, not merely scrolling to the bottom. Every concept connects to real software engineering concerns: APIs, types, data quality, deployment, monitoring and security.

## Target learner

**Primary:** frontend, backend or full-stack developer with professional software experience but little structured AI/ML knowledge. **Secondary:** beginning AI developer exploring more advanced Generative AI. **Not in MVP:** classroom administrators, minors-specific educational services, enterprise L&D procurement.

## P0 implementation scope and acceptance criteria

| ID | Capability | Acceptance criteria | Implementation |
|---|---|---|---|
| P0-01 | Identity | User can register, sign in/out and resume saved history | `/auth` session APIs and AuthProvider |
| P0-02 | Personalization | User selects developer background, familiarity, initial track and daily minutes | `/auth/onboarding`, onboarding UI |
| P0-03 | Discoverability | See all paths, with estimated time and completed lesson count | `/learning/paths`, path grid |
| P0-04 | Structured curriculum | Ordered lessons, learning objectives, text and optional code illustrations | `learning/catalog.ts` |
| P0-05 | Learning progression | Previous lesson completion unlocks next lesson *within a path* | `isUnlocked` enforced on GET and POST |
| P0-06 | Assessment | Three canonical questions per lesson, ≥ 2/3 correct required to pass | Server `gradeLesson`, feedback in response |
| P0-07 | Durable completion | Completion persists, retry does not double-award XP | MongoDB unique completion and attempt indexes |
| P0-08 | Progress | XP, number of completed lessons, estimated time, UTC streak, mastered tracks | `/learning/overview`, `/learning/progress` |
| P0-09 | Feedback | Explain correct answers; failed submissions are retryable | Lesson player result state |
| P0-10 | Account isolation | A learner cannot read/update another learner's progress | User identity from verified HttpOnly session |
| P0-11 | Operations baseline | Containerization, env validation, health, telemetry and CI infrastructure | Retained from Sapling template |

## Initial curriculum

Nine learning modules (three per path), 27 graded questions: 

- **AI Foundations:** From rules to learning; Data is your new API; The model lifecycle.
- **Machine Learning:** Supervised learning; Train, validate, test; Gradient descent intuition.
- **Generative AI:** How LLM apps work; Embeddings and RAG; Evaluate before shipping.

Every path starts independently. The lesson narrative deliberately references programming experience. Subject-matter experts should review educational accuracy before a public release.

## Out of scope, not presented as implemented

Python sandbox / notebook, GPU training, live AI tutor, generated feedback, RAG playground, vector search, downloadable certification, admin CMS, instructor dashboards, offline lesson syncing, payments, collaborative classrooms, full learning analytics warehouse.

## Measurement and future hypotheses

- Activation: registration → onboarding completion → first lesson opened.
- Learning efficacy: number of correct concepts on a delayed follow-up quiz (not yet tracked).
- Retention: returning 7-day learners (event tracking planned, not currently computed).
- Depth: path completion rate and median attempts before passing.
- Fairness: fail/pass rates segmented by prior experience with explicit consent and privacy review.

**Initial targets to validate**, not claimed results: 60% first-lesson activation; 70% first-lesson completion; 20% 7-day return.

## UX principles

Short, readable explanation → scenario questions → immediate feedback → next unlock. No negative XP. Keyboard-accessible controls, readable responsive layout and reduced-motion support. Optional hint assistance should reinforce reasoning rather than replace the assessment. A future AI tutor must not be the sole assessor of mastery.

## Product risks

1. Short quizzes can be memorized; add fresh variants, practical work and delayed retrieval.
2. Content writing is a human-intensive bottleneck; invest in authoring tools and expert review.
3. Streaks may reward engagement without genuine learning; keep mastery and engagement metrics separate.
4. LLM and compute costs may escalate; add metering and quotas before enabling external providers.
5. Inaccessible lessons harm learning outcomes; audit with real assistive technologies.

## Definition of next milestone (P1)

An interactive, safe developer playground with code-reading/parameter-tuning exercises, a minimal authoring and content-review workflow, richer attempts history and an adaptive review queue. Defer LLM tutoring until the product can measure its effectiveness and control cost.
