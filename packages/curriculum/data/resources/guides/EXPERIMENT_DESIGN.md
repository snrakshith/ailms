# Experiment design: from baseline to evidence

A model is one component of a decision system. Define observation timestamp, target horizon, prediction unit, decision threshold, and error cost before selecting architecture. For example, a review queue with 100 slots cares about precision and recall among the selected cases, not just ROC AUC. Use a baseline that resembles current operations: seasonal naive for forecasting, majority or prior probability for classification, median for regression, popularity for recommendations. An expensive candidate is only valuable if it improves the relevant metric under the same evaluation protocol.

## The split contract

Treat a split as an explicit data artifact containing record identifiers, group/time keys, and allowed information at each cutoff. Random row splits are suitable only if examples are effectively exchangeable for the intended deployment. Repeated patients/customers, near-identical images and multiple observations from the same source require grouping. Forecasts require chronological evaluation, and overlapping labels may require a gap. All transformations that learn parameters from data belong inside the fitted pipeline, including imputation, scaling, feature selection, target encoding and resampling. An evaluation split should be representative of the target environment and never influence decisions it is intended to validate.

## Uncertainty and failure slices

Mean scores can hide variability across folds, seeds, groups and time. Report both aggregate performance and denominators. A 100% error rate in a group of two is an investigation signal, not strong evidence of stable disparity. A bootstrapped interval assumes an appropriate resampling unit; resample groups for clustered observations and blocks for dependent time series. Accuracy, probability calibration, latency and deployment costs are different properties. Use held-out calibration data and select operating thresholds against known costs. Do not conclude causality from feature attribution.

## Worked design

For a support-ticket classifier, split by account to avoid template leakage. Build a TF-IDF plus logistic baseline; compare a more complex model with the same labels and splits. Set a validation threshold for automatic routing and send uncertain tickets to reviewers. Report auto-routing coverage, accuracy among auto-routed tickets, abstention rate, subgroup support, latency and confidence intervals. A promotion gate can require no critical slice regression and an agreed minimum coverage. On failure, keep previous model, inspect errors and propose a hypothesis to test on a new development iteration.

## Practical connection

LAB02 demonstrates capacity-aware threshold selection; LAB03 demonstrates baseline comparison with cross-validation; LAB13 demonstrates chronological backtesting. Each has a restricted solution and independent test or fixture criteria. They are educational benchmarks, not deployment certifications.
