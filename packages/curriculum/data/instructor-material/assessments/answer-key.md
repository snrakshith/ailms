# Instructor answer key

### F01-L01-Q01
Why restart and run all cells before sharing?

**Expected answer / rubric:** To detect hidden execution-order dependencies and missing setup.

### F01-L01-Q02
How would you implement and verify this exercise? Create an environment, run a notebook from a fresh kernel and record Python/package versions.

**Expected answer / rubric:** The notebook runs top-to-bottom without manual state; the interpreter matches the environment.

### F01-L02-Q01
Does a Python type hint validate runtime values?

**Expected answer / rubric:** No; explicit validation or a library is needed.

### F01-L02-Q02
How would you implement and verify this exercise? Implement a count-by-category function handling empty input and missing labels.

**Expected answer / rubric:** Empty input returns an empty dictionary; repeated calls are independent.

### F01-L03-Q01
What dimensions can broadcast?

**Expected answer / rubric:** Equal dimensions or a dimension of size one, aligned from the right.

### F01-L03-Q02
How would you implement and verify this exercise? Standardize a 3-column matrix including a constant column, preserving its shape.

**Expected answer / rubric:** Nonconstant columns have near-zero mean and unit variance; the constant column remains finite.

### F01-L04-Q01
Why inspect join cardinality?

**Expected answer / rubric:** To prevent accidental row multiplication or lost records.

### F01-L04-Q02
How would you implement and verify this exercise? Create a data-quality report with missing counts, duplicate keys and label distribution.

**Expected answer / rubric:** Report row counts before and after joins and identify nonunique keys.

### F01-L05-Q01
What should an experiment record besides the seed?

**Expected answer / rubric:** Code version, data version, dependency versions, parameters and metrics.

### F01-L05-Q02
How would you implement and verify this exercise? Write three tests for a numerical feature transformer and document a run command.

**Expected answer / rubric:** Tests pass independently; secrets are not in the repository.

### F02-L01-Q01
When is cosine similarity undefined?

**Expected answer / rubric:** When either vector has zero norm.

### F02-L01-Q02
How would you implement and verify this exercise? Compute batch scores by hand for two rows and verify with NumPy.

**Expected answer / rubric:** Scores match and output shape is (2,).

### F02-L02-Q01
What does PCA maximize?

**Expected answer / rubric:** Variance captured by orthogonal components of centered data.

### F02-L02-Q02
How would you implement and verify this exercise? Reconstruct a matrix with ranks 1 and 2; calculate Frobenius error.

**Expected answer / rubric:** Rank-2 error is no larger than rank-1 error.

### F02-L03-Q01
Why does prevalence matter?

**Expected answer / rubric:** The posterior combines the likelihood with the prior probability.

### F02-L03-Q02
How would you implement and verify this exercise? Use prevalence 1%, sensitivity 90% and specificity 95% to calculate posterior.

**Expected answer / rubric:** Posterior is about 15.4%, not 90%.

### F02-L04-Q01
What does 95% confidence mean?

**Expected answer / rubric:** Under repeated valid sampling, the interval procedure covers the parameter about 95% of the time.

### F02-L04-Q02
How would you implement and verify this exercise? Generate bootstrap intervals for sample sizes 20 and 200 from the same distribution.

**Expected answer / rubric:** Explain why larger samples generally yield narrower intervals.

### F02-L05-Q01
Why is the chain rule essential to neural networks?

**Expected answer / rubric:** It propagates gradients through composed layers.

### F02-L05-Q02
How would you implement and verify this exercise? Compare trajectories for learning rates 0.1, 0.9 and 1.1.

**Expected answer / rubric:** Identify convergence, oscillation and divergence using loss values.

### F02-L06-Q01
Is KL divergence symmetric?

**Expected answer / rubric:** No, swapping the distributions generally changes the result.

### F02-L06-Q02
How would you implement and verify this exercise? Compute negative log likelihood for both probabilities and explain the penalty.

**Expected answer / rubric:** The 0.1 prediction has the higher loss; use stable log handling.

### M01-L01-Q01
Why use a baseline?

**Expected answer / rubric:** To quantify whether additional modeling complexity improves outcomes.

### M01-L01-Q02
How would you implement and verify this exercise? Write a problem statement for demand forecasting with an explicit baseline and business metric.

**Expected answer / rubric:** Prediction horizon, input availability, split and cost of errors are explicit.

### M01-L02-Q01
Should scalers be fit before the split?

**Expected answer / rubric:** No, fit them on training data only.

### M01-L02-Q02
How would you implement and verify this exercise? Design splits for transactions from repeat users and for chronological demand data.

**Expected answer / rubric:** No user overlap where required; test timestamps follow train timestamps for forecasting.

### M01-L03-Q01
Why put preprocessing inside cross-validation?

**Expected answer / rubric:** Each fold must learn preprocessing only from its training partition.

### M01-L03-Q02
How would you implement and verify this exercise? Build a pipeline and predict a row with a missing number and unseen category.

**Expected answer / rubric:** Prediction succeeds with the same feature schema; fit uses training only.

### M02-L01-Q01
What does a residual represent?

**Expected answer / rubric:** Observed target minus predicted target.

### M02-L01-Q02
How would you implement and verify this exercise? Fit degrees 1, 3 and 10 and compare validation RMSE.

**Expected answer / rubric:** Select the model by validation performance, not lowest training error.

### M02-L02-Q01
What changes when the threshold changes?

**Expected answer / rubric:** Class decisions and confusion-matrix metrics, not the fitted probability model.

### M02-L02-Q02
How would you implement and verify this exercise? Plot precision and recall for several thresholds and pick one for a review capacity.

**Expected answer / rubric:** Decision threshold is justified by validation costs, not by test outcomes.

### M02-L03-Q01
Which models are sensitive to feature scale?

**Expected answer / rubric:** Distance-based kNN and many SVM configurations.

### M02-L03-Q02
How would you implement and verify this exercise? Cross-validate three models using identical folds and report score and fit time.

**Expected answer / rubric:** Preprocessing is inside folds and trade-offs are documented.

### M02-L04-Q01
How does bagging reduce variance?

**Expected answer / rubric:** It averages diverse estimators whose errors are not perfectly correlated.

### M02-L04-Q02
How would you implement and verify this exercise? Compare train and validation scores across tree depths and forest sizes.

**Expected answer / rubric:** Report the generalization gap and a stable configuration.

### M02-L05-Q01
What is the key difference between bagging and boosting?

**Expected answer / rubric:** Bagging aggregates independently trained models; boosting fits learners sequentially to improve the current ensemble.

### M02-L05-Q02
How would you implement and verify this exercise? Compare sklearn histogram boosting and one external booster on the same split.

**Expected answer / rubric:** Log validation metric, runtime and chosen iteration count.

### M02-L06-Q01
Does regularization always improve performance?

**Expected answer / rubric:** No; excessive regularization can cause underfitting.

### M02-L06-Q02
How would you implement and verify this exercise? Plot learning curves and validation error for several penalty strengths.

**Expected answer / rubric:** Identify high bias or high variance and propose one intervention.

### M03-L01-Q01
Why can accuracy be misleading under imbalance?

**Expected answer / rubric:** A majority-class predictor can score highly while missing nearly all positives.

### M03-L01-Q02
How would you implement and verify this exercise? Calculate confusion metrics and choose a metric for fraud review, demand forecast and search ranking.

**Expected answer / rubric:** Metric choice matches business costs and includes subgroup analysis.

### M03-L02-Q01
What is nested CV for?

**Expected answer / rubric:** Estimating generalization of a model-selection procedure without using outer folds for tuning.

### M03-L02-Q02
How would you implement and verify this exercise? Run randomized search and report mean, standard deviation and final holdout performance once.

**Expected answer / rubric:** Split strategy and search budget are recorded.

### M03-L03-Q01
What does a calibrated 0.8 probability mean?

**Expected answer / rubric:** Among comparable predictions near 0.8, roughly 80% should be positive.

### M03-L03-Q02
How would you implement and verify this exercise? Compare precision-recall, Brier score and calibration curves on a natural-prevalence holdout.

**Expected answer / rubric:** Report threshold, prevalence and calibration approach.

### M03-L04-Q01
Can SHAP prove a feature causes an outcome?

**Expected answer / rubric:** No, model attribution is not causal identification.

### M03-L04-Q02
How would you implement and verify this exercise? Produce an error slice report with subgroup sizes, metrics and limitations.

**Expected answer / rubric:** Small groups are flagged; proposed mitigations are evaluated on validation data.

### M04-L01-Q01
Why might DBSCAN label points as noise?

**Expected answer / rubric:** They are not density-reachable under the selected parameters.

### M04-L01-Q02
How would you implement and verify this exercise? Compare silhouette scores and visual structure across algorithms.

**Expected answer / rubric:** Explain which geometries and parameter choices fit the data.

### M04-L02-Q01
Should t-SNE cluster distances be treated as exact original distances?

**Expected answer / rubric:** No; global geometry can be distorted.

### M04-L02-Q02
How would you implement and verify this exercise? Compare PCA explained variance and multiple nonlinear embeddings.

**Expected answer / rubric:** Document seed, settings and visualization limitations.

### M04-L03-Q01
What is novelty detection?

**Expected answer / rubric:** Scoring new observations against a model of normal training data.

### M04-L03-Q02
How would you implement and verify this exercise? Evaluate precision at a fixed daily alert budget using labeled anomalies.

**Expected answer / rubric:** Report false positives and sensitivity to changing baseline behavior.

### M05-L01-Q01
Why use rolling-origin evaluation?

**Expected answer / rubric:** It simulates repeated forecasts using only historical information.

### M05-L01-Q02
How would you implement and verify this exercise? Build three expanding-window backtests and compare MAE to seasonal naive.

**Expected answer / rubric:** All prediction dates follow their training data; forecast horizon is constant.

### M05-L02-Q01
Why use candidate retrieval before ranking?

**Expected answer / rubric:** It reduces the number of items requiring expensive ranking.

### M05-L02-Q02
How would you implement and verify this exercise? Compare popularity baseline with nearest-neighbor recommendations.

**Expected answer / rubric:** Report recall@k for warm and cold-start segments separately.

### M05-L03-Q01
Can accurate prediction establish causality?

**Expected answer / rubric:** No; causal claims need a valid identification strategy.

### M05-L03-Q02
How would you implement and verify this exercise? Specify unit of randomization, primary outcome, guardrail metrics and analysis plan.

**Expected answer / rubric:** Plan addresses interference, missing data and statistical uncertainty.

### D01-L01-Q01
Why zero gradients before a training step?

**Expected answer / rubric:** PyTorch accumulates gradients rather than replacing them automatically.

### D01-L01-Q02
How would you implement and verify this exercise? Compute an analytic gradient and compare with autograd.

**Expected answer / rubric:** Gradient equals 2*x within tolerance.

### D01-L02-Q01
Why are nonlinear activations needed?

**Expected answer / rubric:** Without them, stacked linear layers cannot represent nonlinear decision boundaries.

### D01-L02-Q02
How would you implement and verify this exercise? Compare a linear model with an MLP on XOR.

**Expected answer / rubric:** MLP can fit XOR; linear baseline cannot perfectly separate it.

### D01-L03-Q01
Does backpropagation update weights itself?

**Expected answer / rubric:** No; it computes gradients that an optimizer uses to update weights.

### D01-L03-Q02
How would you implement and verify this exercise? Hand-derive gradients for a scalar linear prediction and squared loss.

**Expected answer / rubric:** Analytic and autograd gradients agree.

### D01-L04-Q01
What does AdamW decouple?

**Expected answer / rubric:** Weight decay from the adaptive gradient update.

### D01-L04-Q02
How would you implement and verify this exercise? Train short runs at several learning rates and log loss curves.

**Expected answer / rubric:** Choose based on validation and stability rather than a single training curve.

### D02-L01-Q01
Why use model.eval() plus no_grad or inference_mode?

**Expected answer / rubric:** They control module behavior and gradient recording separately.

### D02-L01-Q02
How would you implement and verify this exercise? Implement train_epoch and evaluate functions with sample-weighted losses.

**Expected answer / rubric:** Training changes weights; evaluation does not; batch sizes are handled correctly.

### D02-L02-Q01
Why can dropout predictions differ in training mode?

**Expected answer / rubric:** Random activation masks are sampled during training.

### D02-L02-Q02
How would you implement and verify this exercise? Compare baseline, dropout and weight decay using validation curves.

**Expected answer / rubric:** Restore the best validation checkpoint and report test once.

### D02-L03-Q01
What is data-parallel training?

**Expected answer / rubric:** Replicas process different data batches and synchronize gradients.

### D02-L03-Q02
How would you implement and verify this exercise? Compare throughput and validation loss on available hardware; if CPU-only, calculate memory estimates.

**Expected answer / rubric:** Report precision, device, batch size, throughput and numerical anomalies.

### D03-L01-Q01
Why use weight sharing in CNNs?

**Expected answer / rubric:** It reduces parameters and applies the same local feature detector across positions.

### D03-L01-Q02
How would you implement and verify this exercise? Design a CNN and calculate the shape after each layer before running it.

**Expected answer / rubric:** Computed shapes match actual tensor shapes.

### D03-L02-Q01
What do recurrent gates control?

**Expected answer / rubric:** How information is retained, updated and exposed in hidden state.

### D03-L02-Q02
How would you implement and verify this exercise? Train a small GRU on synthetic sequences and compare to a naive baseline.

**Expected answer / rubric:** Evaluate on sequences not used in training and explain failure cases.

### D03-L03-Q01
Why divide attention logits by sqrt(d)?

**Expected answer / rubric:** To moderate score magnitude as key dimension grows.

### D03-L03-Q02
How would you implement and verify this exercise? Implement small causal attention with a triangular mask and test future-token invariance.

**Expected answer / rubric:** Changing future tokens does not alter earlier outputs.

### D03-L04-Q01
Which architecture is typical for autoregressive chat LLMs?

**Expected answer / rubric:** Decoder-only transformers, though other architectures exist.

### D03-L04-Q02
How would you implement and verify this exercise? Diagram the three architectures and label attention connections and objectives.

**Expected answer / rubric:** Each diagram correctly indicates access to future input and target tokens.

### D04-L01-Q01
What is self-supervised learning?

**Expected answer / rubric:** Learning from supervision constructed from the data itself rather than manual labels.

### D04-L01-Q02
How would you implement and verify this exercise? Compare frozen and partially unfrozen models on a small validation set.

**Expected answer / rubric:** Log trainable parameters, data split and performance.

### D04-L02-Q01
What is GAN mode collapse?

**Expected answer / rubric:** The generator produces insufficiently diverse outputs despite plausible individual samples.

### D04-L02-Q02
How would you implement and verify this exercise? Compare reconstruction on normal and shifted samples; explain how VAE sampling differs.

**Expected answer / rubric:** Show inputs, reconstructions and failure examples.

### D04-L03-Q01
What does latent diffusion change?

**Expected answer / rubric:** It performs the diffusion process in a compressed representation rather than directly in pixels.

### D04-L03-Q02
How would you implement and verify this exercise? Visualize a simple noising schedule and compare denoising errors across timesteps.

**Expected answer / rubric:** Explain the trade-off between sampling compute and quality.

### D04-L04-Q01
Why is reward design important?

**Expected answer / rubric:** Optimizing a proxy can yield undesirable behavior if it differs from the intended goal.

### D04-L04-Q02
How would you implement and verify this exercise? Implement a two-armed bandit and report cumulative regret across seeds.

**Expected answer / rubric:** Show exploration/exploitation effects and limitations.

### C01-L01-Q01
What color order does cv2.imread normally use?

**Expected answer / rubric:** BGR for default color images.

### C01-L01-Q02
How would you implement and verify this exercise? Create a synthetic color image, convert spaces and verify channel values.

**Expected answer / rubric:** Shapes and dtype are recorded; channel conversion is correct.

### C01-L02-Q01
What is morphological opening?

**Expected answer / rubric:** Erosion followed by dilation using a structuring element.

### C01-L02-Q02
How would you implement and verify this exercise? Compare masks for multiple kernel sizes and quantify foreground area.

**Expected answer / rubric:** Preserve target shape while removing isolated noise.

### C01-L03-Q01
What does RANSAC do?

**Expected answer / rubric:** Fits a model robustly by testing candidate subsets and selecting strong inlier support.

### C01-L03-Q02
How would you implement and verify this exercise? Apply a perspective transform and quantify inlier matches or reprojection error.

**Expected answer / rubric:** Use robust estimation and report geometric assumptions.

### C02-L01-Q01
Why split videos by source rather than frames?

**Expected answer / rubric:** Neighboring frames can be near duplicates, inflating validation performance.

### C02-L01-Q02
How would you implement and verify this exercise? Create a dataset audit with class counts, duplicates, split groups and annotation examples.

**Expected answer / rubric:** Validation transforms are deterministic and label geometry remains consistent.

### C02-L02-Q01
What does freezing a backbone do?

**Expected answer / rubric:** Prevents its parameters from updating while the head learns.

### C02-L02-Q02
How would you implement and verify this exercise? Compare a scratch CNN and pretrained backbone using the same split.

**Expected answer / rubric:** Report macro F1, per-class confusion and inference time.

### C03-L01-Q01
What does IoU measure?

**Expected answer / rubric:** Intersection area divided by union area.

### C03-L01-Q02
How would you implement and verify this exercise? Implement IoU and class-aware NMS for a few predicted boxes.

**Expected answer / rubric:** Unit tests cover no overlap, exact match and different classes.

### C03-L02-Q01
How does DETR differ from many traditional detectors?

**Expected answer / rubric:** It learns set prediction with matching and commonly avoids conventional NMS.

### C03-L02-Q02
How would you implement and verify this exercise? Train or fine-tune a detector on a small custom dataset; profile latency and mAP.

**Expected answer / rubric:** Record architecture, data license, image size, IoU settings and hardware.

### C03-L03-Q01
What is the difference between semantic and instance segmentation?

**Expected answer / rubric:** Instance segmentation separates individual objects of the same class.

### C03-L03-Q02
How would you implement and verify this exercise? Implement mask metrics and evaluate per-class scores on synthetic masks.

**Expected answer / rubric:** Tests include empty masks and documented empty-class conventions.

### C03-L04-Q01
Why are U-Net skip connections useful?

**Expected answer / rubric:** They recover spatial detail from earlier encoder features.

### C03-L04-Q02
How would you implement and verify this exercise? Evaluate segmentation quality for difficult cases such as occlusion or small objects.

**Expected answer / rubric:** Report per-case IoU and prompts; note domain limitations.

### C04-L01-Q01
What is an identity switch?

**Expected answer / rubric:** A tracker assigns a different identity to an object previously tracked under another identity.

### C04-L01-Q02
How would you implement and verify this exercise? Create a synthetic video sequence with crossing objects and compare identity errors.

**Expected answer / rubric:** Document track creation/deletion and failure cases.

### C04-L02-Q01
How does CLIP enable zero-shot classification?

**Expected answer / rubric:** It scores image embeddings against text embeddings for candidate classes.

### C04-L02-Q02
How would you implement and verify this exercise? Evaluate two prompt templates and inspect misclassified images.

**Expected answer / rubric:** Report macro F1 and prompt sensitivity on a fixed split.

### C04-L03-Q01
Why preserve original image coordinates?

**Expected answer / rubric:** Detected regions must map correctly back to the source image.

### C04-L03-Q02
How would you implement and verify this exercise? Build an OCR or image inference mini-pipeline with latency and error tests.

**Expected answer / rubric:** Return structured outputs, verify preprocessing parity and measure failures.

### G01-L01-Q01
What is a next-token language model trained to predict?

**Expected answer / rubric:** A distribution over the next token given preceding context.

### G01-L01-Q02
How would you implement and verify this exercise? Classify five business use cases by generation, retrieval or deterministic computation.

**Expected answer / rubric:** Explain when a non-generative solution is preferable.

### G01-L02-Q01
Are tokens equivalent to words?

**Expected answer / rubric:** No; a token may be part of a word, punctuation or another text unit.

### G01-L02-Q02
How would you implement and verify this exercise? Measure token counts for three strings and implement a context-budget check.

**Expected answer / rubric:** Use the actual model tokenizer and reserve space for output.

### G01-L03-Q01
What does lower temperature generally do?

**Expected answer / rubric:** Concentrates probability mass on higher-scoring tokens.

### G01-L03-Q02
How would you implement and verify this exercise? Record five generations per setting and compare format compliance and diversity.

**Expected answer / rubric:** Separate repeatability from factual accuracy.

### G01-L04-Q01
Why pin a model revision?

**Expected answer / rubric:** To make the artifact and behavior more reproducible.

### G01-L04-Q02
How would you implement and verify this exercise? Compare three model cards for task fit, license, size and known limitations.

**Expected answer / rubric:** Document exact revision and do not enable remote code without review.

### G02-L01-Q01
Does one-shot prompting guarantee deterministic output?

**Expected answer / rubric:** No; decoding, infrastructure and model behavior also matter.

### G02-L01-Q02
How would you implement and verify this exercise? Build a labeled holdout and compare all three prompt variants with fixed decoding settings.

**Expected answer / rubric:** Report accuracy, format errors and example-selection criteria.

### G02-L02-Q01
Why validate even when a provider offers structured output?

**Expected answer / rubric:** Application rules, data provenance and semantic constraints still need checking.

### G02-L02-Q02
How would you implement and verify this exercise? Define a strict Pydantic schema and test malformed, missing and extra fields.

**Expected answer / rubric:** Invalid payloads fail safely; valid payloads serialize predictably.

### G02-L03-Q01
Why are generated explanations insufficient as proof?

**Expected answer / rubric:** They can be plausible but inconsistent with the actual facts or computations.

### G02-L03-Q02
How would you implement and verify this exercise? Compare persona vs neutral prompts and test input that asks to ignore instructions.

**Expected answer / rubric:** Evaluate correctness and instruction adherence using external checks.

### G02-L04-Q01
Are ChatML, Alpaca and INST universal standards?

**Expected answer / rubric:** No; they are model-family conventions with variations.

### G02-L04-Q02
How would you implement and verify this exercise? Render two actual model templates and identify role and generation markers.

**Expected answer / rubric:** Use the tokenizer's own template and document supported roles.

### G02-L05-Q01
What should a prompt version record include?

**Expected answer / rubric:** Template, model configuration, schema, evaluation dataset and results.

### G02-L05-Q02
How would you implement and verify this exercise? Create a prompt registry record with model revision, template hash and evaluation results.

**Expected answer / rubric:** Regression report compares one variable at a time and tracks cost and latency.

### G03-L01-Q01
Is a vector database itself an embedding model?

**Expected answer / rubric:** No; it stores and indexes vectors generated elsewhere.

### G03-L01-Q02
How would you implement and verify this exercise? Implement brute-force cosine retrieval, then compare one vector backend.

**Expected answer / rubric:** Record model, dimension, metric and metadata filter behavior.

### G03-L02-Q01
Why store source metadata alongside chunks?

**Expected answer / rubric:** To enforce access and provide verifiable citations and lifecycle control.

### G03-L02-Q02
How would you implement and verify this exercise? Build a chunker with stable IDs and test document update/deletion behavior.

**Expected answer / rubric:** Chunks trace to source spans and old versions can be removed.

### G03-L03-Q01
What is the purpose of a reranker?

**Expected answer / rubric:** Improve relevance ordering among retrieved candidates.

### G03-L03-Q02
How would you implement and verify this exercise? Measure recall@k before/after hybrid retrieval and manually inspect citations.

**Expected answer / rubric:** Answer cites only available source IDs and abstains on unanswerable queries.

### G03-L04-Q01
Can an answer be correct but unfaithful?

**Expected answer / rubric:** Yes; it may be correct from prior knowledge without support from retrieved evidence.

### G03-L04-Q02
How would you implement and verify this exercise? Create ten answerable and five unanswerable queries and report retrieval and answer metrics.

**Expected answer / rubric:** Show per-query evidence and abstention behavior, not just averages.

### G04-L01-Q01
How does original Self-RAG differ from a generic RAG critique loop?

**Expected answer / rubric:** It incorporates learned reflection tokens in the trained model.

### G04-L01-Q02
How would you implement and verify this exercise? Implement a bounded grade-and-retry loop with a deterministic mock grader and evaluate false accepts.

**Expected answer / rubric:** Stop on max attempts and preserve evidence for every decision.

### G04-L02-Q01
What does CRAG primarily correct?

**Expected answer / rubric:** Poor or uncertain retrieved evidence before generation.

### G04-L02-Q02
How would you implement and verify this exercise? Implement a three-way retrieval-quality router with an offline fallback corpus.

**Expected answer / rubric:** Route tests cover strong, weak, ambiguous and unavailable fallback cases.

### G04-L03-Q01
How is answer correction different from retrieval correction?

**Expected answer / rubric:** It targets the generated claims rather than only the retrieved documents.

### G04-L03-Q02
How would you implement and verify this exercise? Implement a verifier with max three attempts and an explicit abstain state.

**Expected answer / rubric:** All runs terminate; unsupported claims are removed or flagged.

### G04-L04-Q01
When is simple RAG preferable?

**Expected answer / rubric:** When one predictable retrieval path handles the task reliably.

### G04-L04-Q02
How would you implement and verify this exercise? Compare deterministic routing with a bounded agent on a mixed question set.

**Expected answer / rubric:** Report route accuracy, recall, tool count and cost proxy.

### G05-L01-Q01
Who actually executes a tool call?

**Expected answer / rubric:** The application/runtime, after validation and authorization.

### G05-L01-Q02
How would you implement and verify this exercise? Implement a tool registry, argument validation and unknown-tool error handling.

**Expected answer / rubric:** Invalid and unauthorized calls do not execute; errors are structured.

### G05-L02-Q01
What distinguishes ReAct from a fixed chain?

**Expected answer / rubric:** It chooses successive actions based on intermediate observations.

### G05-L02-Q02
How would you implement and verify this exercise? Build a mock loop that stops after four actions or a valid final result.

**Expected answer / rubric:** Trace records action name, sanitized arguments, observation and termination reason.

### G05-L03-Q01
When should reflection stop?

**Expected answer / rubric:** When acceptance criteria pass, budget expires or escalation is needed.

### G05-L03-Q02
How would you implement and verify this exercise? Build a mock rubric checker and compare one-pass versus iterative outputs.

**Expected answer / rubric:** Track improvement, revision count, failure rate and stop reason.

### G05-L04-Q01
Why not use multiple agents for every task?

**Expected answer / rubric:** They introduce coordination, latency, cost and failure complexity.

### G05-L04-Q02
How would you implement and verify this exercise? Implement a supervisor with two mock specialists and bounded fan-out.

**Expected answer / rubric:** Each worker has narrow tools; merge resolves conflicts and records provenance.

### G06-L01-Q01
What is the benefit of an adapter boundary?

**Expected answer / rubric:** It isolates provider/framework changes from domain logic and tests.

### G06-L01-Q02
How would you implement and verify this exercise? Implement an adapter and swap a fake for one configured model.

**Expected answer / rubric:** Tests run without network; provider failures return controlled errors.

### G06-L02-Q01
When is a sequential graph appropriate?

**Expected answer / rubric:** When required stages and their order are known in advance.

### G06-L02-Q02
How would you implement and verify this exercise? Create a two-node offline graph and test the final state.

**Expected answer / rubric:** Each node has a clear state contract and can be unit-tested.

### G06-L03-Q01
Why are reducers needed for some parallel state fields?

**Expected answer / rubric:** They define how concurrent updates combine rather than overwrite or conflict.

### G06-L03-Q02
How would you implement and verify this exercise? Construct a mock router and two parallel branches with a deterministic reducer.

**Expected answer / rubric:** Both branches contribute exactly once; invalid routes terminate.

### G06-L04-Q01
Why is idempotency important for resumable workflows?

**Expected answer / rubric:** Replayed steps must not repeat harmful external effects.

### G06-L04-Q02
How would you implement and verify this exercise? Build a review gate and test approve, reject and resume cases.

**Expected answer / rubric:** No write occurs before approval; duplicate resume does not duplicate side effects.

### G07-L01-Q01
What does MCP standardize?

**Expected answer / rubric:** Interfaces for AI applications to discover and access external capabilities and context.

### G07-L01-Q02
How would you implement and verify this exercise? Diagram host/client/server and define schemas and permissions for two capabilities.

**Expected answer / rubric:** Explain the difference between tool execution and resource access.

### G07-L02-Q01
Why prefer typed tool schemas?

**Expected answer / rubric:** They communicate the input contract and enable validation.

### G07-L02-Q02
How would you implement and verify this exercise? Create a read-only server, list tools and test valid/invalid invocation.

**Expected answer / rubric:** Discovery works and validation rejects malformed arguments.

### G07-L03-Q01
Does a tool's advertised description establish trust?

**Expected answer / rubric:** No; server identity, authorization and runtime enforcement establish trust boundaries.

### G07-L03-Q02
How would you implement and verify this exercise? Write a threat model and tests for cross-tenant requests and malformed resource IDs.

**Expected answer / rubric:** Unauthorized data is denied and logs omit secrets.

### G08-L01-Q01
How does episodic memory differ from semantic memory?

**Expected answer / rubric:** It represents particular experiences/events rather than general knowledge.

### G08-L01-Q02
How would you implement and verify this exercise? Design a memory schema with type, source, timestamp, scope and expiry.

**Expected answer / rubric:** Each entry has an explicit purpose and retention decision.

### G08-L02-Q01
Why store timestamps and provenance?

**Expected answer / rubric:** To resolve stale/conflicting facts and support auditing and deletion.

### G08-L02-Q02
How would you implement and verify this exercise? Implement a scoped in-memory store with update and delete operations, then add vector retrieval.

**Expected answer / rubric:** Two users remain isolated; deleted entries no longer appear in results.

### G08-L03-Q01
Does a memory library replace an application retention policy?

**Expected answer / rubric:** No; the application must enforce purpose, consent and retention requirements.

### G08-L03-Q02
How would you implement and verify this exercise? Connect Mem0 in a sandbox or implement an adapter with a fake backend; test add/search/update/delete.

**Expected answer / rubric:** User isolation and deletion behavior are verified; provider dependencies documented.

### G09-L01-Q01
Does async automatically speed up CPU-bound work?

**Expected answer / rubric:** No; it mainly helps overlap waiting for I/O.

### G09-L01-Q02
How would you implement and verify this exercise? Build a FastAPI service with health and validated inference endpoints.

**Expected answer / rubric:** Tests cover success, invalid input, timeout and error responses.

### G09-L02-Q01
Why include a completion event?

**Expected answer / rubric:** It helps clients distinguish a finished response from an interrupted connection.

### G09-L02-Q02
How would you implement and verify this exercise? Implement SSE events for delta, done and error and test a canceled client.

**Expected answer / rubric:** Events are framed correctly; cancellation stops unnecessary work.

### G09-L03-Q01
Why use an LLM gateway?

**Expected answer / rubric:** Centralize access, routing, quotas, cost tracking and cross-provider integration.

### G09-L03-Q02
How would you implement and verify this exercise? Create a gateway configuration template and test mock fallback behavior.

**Expected answer / rubric:** Log selected model, failure reason, latency and cost metadata without secrets.

### G09-L04-Q01
Why enforce permissions outside the LLM?

**Expected answer / rubric:** The model can be manipulated or mistaken; runtime authorization is authoritative.

### G09-L04-Q02
How would you implement and verify this exercise? Threat-model an agent and build tests for injection, unauthorized actions and sensitive output.

**Expected answer / rubric:** Fail closed for protected actions; escalation and audit events are recorded.

### G10-L01-Q01
Why randomize answer order in pairwise judging?

**Expected answer / rubric:** To detect or reduce position bias.

### G10-L01-Q02
How would you implement and verify this exercise? Create a rubric with anchors, run pairwise comparisons in both orders and review disagreements.

**Expected answer / rubric:** Report agreement, judge config and failure cases; do not use judge score alone.

### G10-L02-Q01
Why separate offline and judge-backed tests?

**Expected answer / rubric:** Offline tests are stable and inexpensive; semantic judging is variable and may cost money.

### G10-L02-Q02
How would you implement and verify this exercise? Write an offline exact-match test and a separate opt-in DeepEval semantic test.

**Expected answer / rubric:** Offline CI works without keys; judge-backed checks log thresholds and model.

### G10-L03-Q01
What does faithfulness aim to measure?

**Expected answer / rubric:** Whether answer claims are supported by supplied context.

### G10-L03-Q02
How would you implement and verify this exercise? Prepare a dataset with user input, retrieved contexts, response and reference; select appropriate metrics.

**Expected answer / rubric:** Report per-metric required columns, model and sample-level failure analysis.

### G10-L04-Q01
Why test prompts against a fixed fixture set?

**Expected answer / rubric:** To detect regressions when templates or providers change.

### G10-L04-Q02
How would you implement and verify this exercise? Create a local evaluation configuration for normal and adversarial inputs with pass criteria.

**Expected answer / rubric:** Report passing and failing cases and keep secrets in environment variables.

### G10-L05-Q01
What does p95 latency mean?

**Expected answer / rubric:** 95% of measured requests complete at or below that duration.

### G10-L05-Q02
How would you implement and verify this exercise? Define an evaluation dashboard and a CI gate for four metrics with rollback criteria.

**Expected answer / rubric:** Each metric has dataset, threshold, owner and failure action.

### G11-L01-Q01
What is LoRA's central idea?

**Expected answer / rubric:** Learn a low-rank weight update while keeping the base weights frozen.

### G11-L01-Q02
How would you implement and verify this exercise? Create a small licensed instruction dataset, split it, configure LoRA and plan a baseline comparison.

**Expected answer / rubric:** Report trainable parameters, data provenance and validation metrics.

### G11-L02-Q01
What does the KV cache store?

**Expected answer / rubric:** Attention key/value states for previously processed tokens to avoid recomputation.

### G11-L02-Q02
How would you implement and verify this exercise? Estimate weight and KV-cache memory and benchmark a compatible serving configuration if hardware is available.

**Expected answer / rubric:** Document hardware, model, quality, throughput and actual peak memory.

### G11-L03-Q01
When is RAG preferable to fine-tuning for changing facts?

**Expected answer / rubric:** When facts must be retrieved and updated independently with traceable evidence.

### G11-L03-Q02
How would you implement and verify this exercise? Design a benchmark and choose an architecture for document QA versus image generation.

**Expected answer / rubric:** Justify modality, evidence source, model choice, and privacy controls.

### P01-L01-Q01
Why package preprocessing with a model?

**Expected answer / rubric:** To avoid train-serving skew.

### P01-L01-Q02
How would you implement and verify this exercise? Build a container and run a health check and prediction contract test.

**Expected answer / rubric:** Container runs without training or secrets baked into image.

### P01-L02-Q01
What is the difference between a run and a model version?

**Expected answer / rubric:** A run records an experiment; a version identifies a registered model artifact.

### P01-L02-Q02
How would you implement and verify this exercise? Track a baseline and candidate; record why one is promoted.

**Expected answer / rubric:** Runs include code/data identifiers and reproducible configuration.

### P01-L03-Q01
Why gate deployment on model quality as well as code tests?

**Expected answer / rubric:** Correct software can still serve a degraded or unsafe model.

### P01-L03-Q02
How would you implement and verify this exercise? Design CI for a model service and simulate a failed quality threshold.

**Expected answer / rubric:** Failed tests or quality gates block release; artifacts are immutable.

### P02-L01-Q01
Can data drift occur without concept drift?

**Expected answer / rubric:** Yes; input distribution can change while the target relationship stays stable.

### P02-L01-Q02
How would you implement and verify this exercise? Create drift and service alerts, escalation thresholds and a rollback plan.

**Expected answer / rubric:** Alerts have actionable ownership, context and known false-positive limitations.

### P02-L02-Q01
What should a model card communicate?

**Expected answer / rubric:** Intended use, evaluation, limitations, data considerations and known risks.

### P02-L02-Q02
How would you implement and verify this exercise? Draft data inventory, model limitations, approval checkpoints and incident procedure.

**Expected answer / rubric:** Every risk has mitigation, owner and validation evidence.

### P02-L03-Q01
Why separate ingestion and online inference?

**Expected answer / rubric:** They have different resource, latency and scaling characteristics.

### P02-L03-Q02
How would you implement and verify this exercise? Diagram architecture, forecast cost drivers and define rollback and recovery objectives.

**Expected answer / rubric:** Architecture includes identity, encryption, limits, monitoring and failure isolation.