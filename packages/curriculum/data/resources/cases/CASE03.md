# Digit image recognition

## Business problem
Develop a resource-constrained image classifier.

## Data
Optical recognition of handwritten digits

Access: `sklearn.datasets.load_digits`

Real 8x8 benchmark loaded from installed sklearn; not a modern document OCR dataset.

Source: https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_digits.html

## Implementation and experiment
Stratified split; train small CNN; restore best validation checkpoint; report macro F1 and confusion matrix extension.

Start with `labs/LAB05.md`. Record data hash or package version, split, assumptions, metrics and failed examples.

## Acceptance and portfolio deliverable
Holdout evaluation, failure examples and model size. No claim of production OCR.

Submit experiment log, reproducible source, tests, limitations and short design report.

## Discussion
What changes if the distribution shifts, labels are delayed, or the system faces unanticipated inputs? Identify one monitoring signal and one mitigation.
