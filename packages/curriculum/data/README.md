# Curriculum data layout

This package preserves the learner-safe portions of the AI Engineering, DevOps & DevSecOps, and
Data Structures & Algorithms curricula.

- `catalog/` contains the curriculum structure and lesson metadata.
- `assessments/` contains learner-facing reflective questions only.
- `lesson-content/` contains Markdown organised by descriptive track name and stable module ID.
- `resources/` contains learner-facing code, offline notebooks, lab starters, diagrams, visualizations, datasets and supporting course documents.
- `courses/devops/` and `courses/dsa/` retain each imported package's native, documented layout.
  Their `data/curriculum.json` files remain the source of truth for those independent courses.

Instructor solutions, answer keys, solution notebooks and the instructor question bank are intentionally excluded from learner delivery.

Restricted source material is retained under `instructor-material/`. It is never added to the learner catalog or resource-download endpoint.

The imported courses omit solutions, lab reference implementations, answer keys and their solution
indexes entirely. Their learner catalog only reads material stored in these public directories.
