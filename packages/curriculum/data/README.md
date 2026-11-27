# Curriculum data layout

This package preserves the learner-safe portion of the AI Engineering v2 curriculum.

- `catalog/` contains the curriculum structure and lesson metadata.
- `assessments/` contains learner-facing reflective questions only.
- `lesson-content/` contains Markdown organised by descriptive track name and stable module ID.
- `resources/` contains learner-facing code, offline notebooks, lab starters, diagrams, visualizations, datasets and supporting course documents.

Instructor solutions, answer keys, solution notebooks and the instructor question bank are intentionally excluded from learner delivery.

Restricted source material is retained under `instructor-material/`. It is never added to the learner catalog or resource-download endpoint.
