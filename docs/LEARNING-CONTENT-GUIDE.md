# Curriculum authoring guide

The MVP uses a curated TypeScript catalog at `apps/api/src/modules/learning/catalog.ts`. Editing the curriculum currently requires an API redeploy; there is no CMS or AI content generation endpoint yet.

## Pedagogy standard

Each lesson should be **8–13 minutes**, connect to a concept familiar to working developers, and have:

1. A memorable concept / problem statement, not just a tool name.
2. Two or more practical learning objectives and short educational sections.
3. At least one software or systems analogy, or a clear example of trade-offs.
4. Three unambiguous application/reasoning questions, each with three plausible options.
5. A factual explanation describing _why_ the correct option is appropriate.
6. An explicit version number and stable slug; never reuse a slug for a different idea.

## Authoring new content

- Add a `lesson(id,title,description,minutes,objectives,sections,questions)` call inside a `path(...)` in `catalog.ts`.
- `question(prompt,[choiceA,choiceB,choiceC],correctIndex,explanation)` assigns stable `q1..q3` IDs and option IDs `a,b,c`.
- New lessons need tests for uniqueness, answer-key withholding, unlock dependencies and pass thresholds.
- Existing completions are keyed by lesson ID. Adding a content version does **not** currently revoke a previous completion; an explicit migration policy will be needed for material revisions.
- Validate educational accuracy with a qualified subject reviewer. Do not treat generated or speculative AI explanations as authoritative.

## Example

```typescript
lesson(
  'train-test-split',
  'Train, validate, test',
  '...',
  11,
  ['Explain why test data must be held out'],
  [{ heading: 'Treat test data like a final exam', body: '...' }],
  [
    question(
      'What is held-out data for?',
      ['Independent evaluation', 'Changing UI color', 'More logging'],
      0,
      'Held-out observations estimate generalization.',
    ),
  ],
);
```

The example shows structure only; the implemented catalog intentionally uses exactly three questions per lesson. Do not add single-question lessons without updating grading policy.

## Quality-review checklist

- Verified facts and dated references for fast-changing AI claims.
- Scenario questions avoid trick wording and double meanings.
- Distractors are plausible without encoding harmful misconceptions.
- Explanations remain useful when the learner chooses incorrectly.
- Code samples are intentionally illustrative and explicitly not represented as executable when no code execution exists.
- Path objectives follow a sensible prerequisite graph.
- Reading level, contrast and keyboard use are reviewed.

## Current versioned content-studio workflow (P1)

The P1 implementation includes a MongoDB-backed `ContentDraft` and immutable `ContentRelease` model. In the React Content Studio `/studio`, configured authors edit a JSON representation of a lesson, save draft, then submit for independent reviewer publication. The editor can change title, objectives, sections and question explanations/options. It validates content through the `reviewedContentSchema` contract, preventing invalid correct answers and duplicate option IDs.

Separate accounts must be explicitly listed in `CONTENT_AUTHORS` and `CONTENT_REVIEWERS`. A reviewer cannot publish their own draft. Published revisions are never loaded into web bundles with answer keys; the API strips them when returning learner lesson content. Existing completions remain attached to the lesson slug, and the attempt records persist the specific lesson version used for grading.

The committed static `catalog.ts` remains the source of seed lessons and their **private** answers; it now lives exclusively inside `apps/api`. New lessons / paths still require code and test changes. Content Studio edits **existing** lessons in the current P1 slice; it does not add new path slugs.

### Known editorial limitations

- Editing is JSON-first, not a visual WYSIWYG builder.
- Two independent reviewers or a formal quality rubric are not enforced; one author + distinct reviewer suffices.
- Concurrent review/edit conflicts are protected by unique release version, but a replica-set transaction and richer audit trail should be added for a high-volume content team.
- Large content changes should prompt learner reassessment without silently invalidating past completions.
