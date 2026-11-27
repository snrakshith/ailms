# Dataset catalog

Real benchmark datasets are accessed through scikit-learn loaders (no external download or raw data redistribution required). Use dataset DESCR for attribution and terms, and review intended use. Clinical datasets are for ML pedagogy only. Synthetic fixtures: retail-demand.csv, policy-corpus.json and policy-eval.json; all fictional. The evaluation queries deliberately match known fixture questions for contract testing, not independent semantic validation.

- Wisconsin diagnostic breast cancer benchmark: `sklearn.datasets.load_breast_cancer` — Real benchmark, built into scikit-learn; not re-distributed. Review upstream citation and terms. No real clinical deployment.
- Diabetes regression benchmark: `sklearn.datasets.load_diabetes` — Real benchmark bundled with scikit-learn, accessed through loader. Educational only.
- Optical recognition of handwritten digits: `sklearn.datasets.load_digits` — Real 8x8 benchmark loaded from installed sklearn; not a modern document OCR dataset.
- Synthetic daily units: `datasets/retail-demand.csv` — Synthetic, generated with fixed seed; no actual retailer data.
- Synthetic policy documents and labeled query fixtures: `datasets/policy-corpus.json` — Synthetic policies, including fictional values; never use as real company guidance.
- Synthetic candidate metrics: `labs/solutions/LAB12.py` — Synthetic metric fixtures; not actual deployment telemetry.