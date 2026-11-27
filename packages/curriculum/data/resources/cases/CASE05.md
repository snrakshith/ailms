# Tenant-scoped support assistant

## Business problem
Answer known policy questions and abstain for unsupported requests without cross-tenant exposure.

## Data
Synthetic policy documents and labeled query fixtures

Access: `datasets/policy-corpus.json`

Synthetic policies, including fictional values; never use as real company guidance.

Source: Original synthetic teaching fixture

## Implementation and experiment
Run lexical baseline on 16 known fixtures, add new paraphrases/ambiguity cases, compare retrieval quality and source citations. Extend with LAB08, LAB09, LAB14, LAB15, LAB16.

Start with `labs/LAB07.md`. Record data hash or package version, split, assumptions, metrics and failed examples.

## Acceptance and portfolio deliverable
Tenant isolation and abstention tests; evaluate independent holdout before claims of semantic generalization.

Submit experiment log, reproducible source, tests, limitations and short design report.

## Discussion
What changes if the distribution shifts, labels are delayed, or the system faces unanticipated inputs? Identify one monitoring signal and one mitigation.
