# Clinical benchmark classification (educational only)

## Business problem
Model a capacity-limited review queue; use malignant-positive label explicitly.

## Data
Wisconsin diagnostic breast cancer benchmark

Access: `sklearn.datasets.load_breast_cancer`

Real benchmark, built into scikit-learn; not re-distributed. Review upstream citation and terms. No real clinical deployment.

Source: https://scikit-learn.org/stable/datasets/toy_dataset.html

## Implementation and experiment
Stratify train, validation and test. Standardize within pipeline. Tune cutoff on validation, report precision, recall, AP and error counts on test.

Start with `labs/LAB02.md`. Record data hash or package version, split, assumptions, metrics and failed examples.

## Acceptance and portfolio deliverable
Capacity compliance on validation, test metrics and limitations; no medical advice.

Submit experiment log, reproducible source, tests, limitations and short design report.

## Discussion
What changes if the distribution shifts, labels are delayed, or the system faces unanticipated inputs? Identify one monitoring signal and one mitigation.
