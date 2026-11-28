# LMS integration contract

Import `data/curriculum.json` as the primary catalog. The schema retains the AI package hierarchy and field names, with a subject-specific ID namespace and additive asset fields. Use `(curriculum_id,id)` as a composite key across courses.

- Render Markdown with sanitized HTML, fenced code and Mermaid. SVG and HTML are standalone learning assets; sandbox HTML in a restricted iframe.
- Import learner questions without answer fields; keep answer bank and solutions behind instructor or explicit reveal authorization. Static websites cannot enforce answer secrecy: do not publish answer keys if exam integrity matters.
- Resolve asset paths relative to package root; validate against path traversal.
- Quizzes, flashcards, labs and pathways are separate JSON catalogs linked by stable IDs.
- `lessons.jsonl` supports streaming ingestion and catalog.csv supports spreadsheet inspection.
- Review status remains draft until independent technical/pedagogical approval.
- No server, auth, progress store, grading API, website or LMS implementation is included.
