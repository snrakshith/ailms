# Regression benchmark and uncertainty

## Business problem
Compare regularized regression with a median baseline on a numeric target.

## Data
Diabetes regression benchmark

Access: `sklearn.datasets.load_diabetes`

Real benchmark bundled with scikit-learn, accessed through loader. Educational only.

Source: https://scikit-learn.org/stable/datasets/toy_dataset.html

## Implementation and experiment
Reserve holdout; tune alpha via K-fold on development; report MAE and residual slices. Add a bootstrap interval if assumptions are appropriate.

Start with `labs/LAB03.md`. Record data hash or package version, split, assumptions, metrics and failed examples.

## Acceptance and portfolio deliverable
Reproducible selection, independent holdout and error analysis.

Submit experiment log, reproducible source, tests, limitations and short design report.

## Discussion
What changes if the distribution shifts, labels are delayed, or the system faces unanticipated inputs? Identify one monitoring signal and one mitigation.
