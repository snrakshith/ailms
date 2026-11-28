# Algorithm selection and formulas

| Model               | Core assumption / idea            | Good starting conditions               | Failure mode                         |
| ------------------- | --------------------------------- | -------------------------------------- | ------------------------------------ |
| Linear regression   | Minimize sum of squared residuals | Numeric target, interpretable baseline | Outliers, nonlinear relationships    |
| Logistic regression | sigmoid(w·x+b); log loss          | Binary classification, sparse features | Nonlinear boundaries, miscalibration |
| kNN                 | Nearest neighbors vote            | Small, scaled dataset                  | High dimension, inference cost       |
| Naive Bayes         | Conditional feature independence  | Sparse text, small sample              | Correlated features                  |
| SVM                 | Maximum margin; kernel optional   | Medium-size scaled dataset             | Kernel compute and calibration       |
| Forest              | Bagging + random feature subsets  | Nonlinear tabular data                 | Memory, weak extrapolation           |
| Boosting            | Add learners to reduce loss       | Tabular prediction                     | Leakage, excessive complexity        |

## Worked example: threshold choice

For a classifier on 1,000 records with 40 positives, suppose TP=30, FP=70, FN=10, TN=890. Accuracy is 920/1000 = 92%, precision is 30/100 = 30%, recall is 30/40 = 75%, and F1 is 2×30/(60+70+10) = 0.429. A majority-negative baseline obtains 96% accuracy but zero recall. If missing a positive costs ten times a false alarm, compare operating thresholds using 10×FN + FP. Here the cost is 170 vs 400 for the majority baseline. Select on validation, not test data.

## Formula review

- MSE = mean((y − ŷ)^2); RMSE = sqrt(MSE); MAE = mean(abs(y − ŷ)).
- Binary cross entropy = −[y log(p) + (1−y) log(1−p)]. Use a stable logits-based implementation.
- Precision = TP/(TP+FP); recall = TP/(TP+FN); F1 = 2PR/(P+R). Define the zero-denominator convention.
- Ridge = squared error + λ||w||²; Lasso = squared error + λ||w||₁. Scaling matters.

**Exercise:** write a cost function and choose a threshold across a fixed validation grid; report the final untouched test result once. Compare PR-AUC and calibration before deciding on deployment.
