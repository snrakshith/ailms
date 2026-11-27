# Retail demand forecasting

## Business problem
A retailer needs a weekly forecast using historical sales only.

## Data
Synthetic daily units

Access: `datasets/retail-demand.csv`

Synthetic, generated with fixed seed; no actual retailer data.

Source: Original synthetic teaching fixture

## Implementation and experiment
Three expanding origins; compare seasonal naive vs trailing mean; report per-origin error and inventory cost extension.

Start with `labs/LAB13.md`. Record data hash or package version, split, assumptions, metrics and failed examples.

## Acceptance and portfolio deliverable
No lookahead, fixed horizon and comparison to baseline.

Submit experiment log, reproducible source, tests, limitations and short design report.

## Discussion
What changes if the distribution shifts, labels are delayed, or the system faces unanticipated inputs? Identify one monitoring signal and one mitigation.
