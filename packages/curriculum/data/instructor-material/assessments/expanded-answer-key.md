# Instructor answer key

## F01-L01-Q03
Move definitions before use, restart, then run all; check executable rather than blindly reinstalling.

A notebook succeeds only after running cell 9 first. Move definitions before use, restart, then run all; check executable rather than blindly reinstalling.

## F01-L02-Q03
Move initialization into the function; call twice and verify independent results.

A default argument `out={}` accumulates previous calls. Move initialization into the function; call twice and verify independent results.

## F01-L03-Q03
Verify shape and axis explicitly.

A zero variance feature produces NaN; using axis=1 instead of axis=0 normalizes samples, not features. Verify shape and axis explicitly.

## F01-L04-Q03
Assert expected cardinality and audit duplicated keys before training.

A many-to-many merge doubles positive cases and inflates apparent performance. Assert expected cardinality and audit duplicated keys before training.

## F01-L05-Q03
Create fixtures per test and remove shared mutation; rotate any credential accidentally committed.

A test passes alone but fails in the suite due to mutable global state. Create fixtures per test and remove shared mutation; rotate any credential accidentally committed.

## F02-L01-Q03
Sum along feature axis or use @, and check dimensions.

Elementwise X*w returns a matrix, not scores. Sum along feature axis or use @, and check dimensions.

## F02-L02-Q03
See worked solution and validate the acceptance criteria.

Applying PCA to uncentered data measures variation around the origin; center using train statistics when variance around the mean is the goal.

## F02-L03-Q03
Draw a frequency table and compute the denominator across both classes.

Confusing sensitivity with positive predictive value gives 90%. Draw a frequency table and compute the denominator across both classes.

## F02-L04-Q03
See worked solution and validate the acceptance criteria.

Resampling individual time points breaks autocorrelation; use appropriate blocks or model-based intervals, and distinguish sample size from resample count.

## F02-L05-Q03
Plot parameters and loss together and check gradient magnitude.

Looking only at loss hides sign oscillation. Plot parameters and loss together and check gradient magnitude.

## F02-L06-Q03
See worked solution and validate the acceptance criteria.

Exponentiating large logits returns inf; avoid probabilities rounded to zero and use logits-based losses where possible.

## M01-L01-Q03
Remove it or use only the planned value available at prediction time.

A feature contains actual future inventory adjustment. Remove it or use only the planned value available at prediction time.

## M01-L02-Q03
See worked solution and validate the acceptance criteria.

Duplicate rows appear across splits; group by source entity or deduplicate before split, and audit timestamp ranges.

## M01-L03-Q03
See worked solution and validate the acceptance criteria.

Fitting the encoder before split leaks category information; put it inside the pipeline passed to cross-validation.

## M02-L01-Q03
See worked solution and validate the acceptance criteria.

Selecting degree 10 from training error encourages overfit; plot validation error and investigate extrapolation outside training range.

## M02-L02-Q03
Calibrate scores and pick threshold on validation, not test.

Using .5 regardless of imbalance/cost may exceed budget or miss positives. Calibrate scores and pick threshold on validation, not test.

## M02-L03-Q03
See worked solution and validate the acceptance criteria.

Distance model dominated by an unscaled income feature; inspect scaled distributions and use same folds for fair comparison.

## M02-L04-Q03
See worked solution and validate the acceptance criteria.

Training accuracy reaches 1.0 but validation declines; reduce depth, min_samples_leaf or use a forest and verify on unseen data.

## M02-L05-Q03
Use validation; preserve a final test and exact package version.

Using test as early-stopping eval_set leaks labels. Use validation; preserve a final test and exact package version.

## M02-L06-Q03
See worked solution and validate the acceptance criteria.

Feature selection performed using all labels leaks information; put SelectKBest inside pipeline and rerun cross-validation.

## M03-L01-Q03
See worked solution and validate the acceptance criteria.

Accuracy .97 masks rare-event errors; inspect confusion counts and business capacity rather than reporting accuracy alone.

## M03-L02-Q03
Retire that test as selection data and obtain a fresh holdout.

Search iterations increase after seeing test performance. Retire that test as selection data and obtain a fresh holdout.

## M03-L03-Q03
See worked solution and validate the acceptance criteria.

Oversampling before split duplicates positives into holdout; resample inside training only and do not change test prevalence.

## M03-L04-Q03
See worked solution and validate the acceptance criteria.

A subgroup with two examples has 100% error; report support and intervals, avoid broad claims or targeting based on unstable estimates.

## M04-L01-Q03
Report noise rate and explain score calculation.

Treating DBSCAN noise as an ordinary cluster distorts silhouette. Report noise rate and explain score calculation.

## M04-L02-Q03
See worked solution and validate the acceptance criteria.

Interpreting distances between t-SNE islands as real distances is unjustified; check original-space neighbors and repeat seeds.

## M04-L03-Q03
Inspect score direction and review labeled examples.

Training on contaminated data or reversing score sign hides real anomalies. Inspect score direction and review labeled examples.

## M05-L01-Q03
See worked solution and validate the acceptance criteria.

Random split permits future leakage; use ordered windows and avoid centered rolling features.

## M05-L02-Q03
Rebuild every feature from training interactions.

Including held-out interactions in similarity matrix leaks targets. Rebuild every feature from training interactions.

## M05-L03-Q03
Randomize by stable user or cluster, document interference.

Randomizing sessions when users see both experiences contaminates effects. Randomize by stable user or cluster, document interference.

## D01-L01-Q03
See worked solution and validate the acceptance criteria.

Calling `.detach()` or converting to NumPy before loss disconnects the gradient; inspect requires_grad and grad_fn.

## D01-L02-Q03
Feed raw logits and threshold only for evaluation.

Applying sigmoid before BCEWithLogitsLoss applies sigmoid twice. Feed raw logits and threshold only for evaluation.

## D01-L03-Q03
Match reduction in manual derivation.

Mistaking sum for mean loss changes effective step scale with batch size. Match reduction in manual derivation.

## D01-L04-Q03
See worked solution and validate the acceptance criteria.

Reusing optimizer moments across trials invalidates comparison; initialize weights and optimizer consistently.

## D02-L01-Q03
See worked solution and validate the acceptance criteria.

Averaging three batch means equally weights the final three examples too much; sum weighted losses and divide by count.

## D02-L02-Q03
See worked solution and validate the acceptance criteria.

Saving `best=model.state_dict()` without copying may retain references to changing tensors; deepcopy or serialize checkpoint immediately.

## D02-L03-Q03
See worked solution and validate the acceptance criteria.

Comparing asynchronous GPU timings without synchronization misreports throughput; warm up and synchronize around measurements.

## D03-L01-Q03
Print intermediate shapes or infer feature dimension with a dummy pass.

Flatten size mismatch occurs when stride/padding changes. Print intermediate shapes or infer feature dimension with a dummy pass.

## D03-L02-Q03
See worked solution and validate the acceptance criteria.

Using padded last timestep instead of true sequence end corrupts representation; gather last valid state or pack sequences.

## D03-L03-Q03
See worked solution and validate the acceptance criteria.

Applying mask after softmax leaves incorrect normalization; mask scores before softmax, avoid fully masked rows or define safe handling.

## D03-L04-Q03
See worked solution and validate the acceptance criteria.

Allowing target positions to attend to future target tokens during training creates leakage; use causal target mask.

## D04-L01-Q03
See worked solution and validate the acceptance criteria.

Frozen parameters do not guarantee batch-norm running stats stay fixed; set frozen modules to eval if required.

## D04-L02-Q03
See worked solution and validate the acceptance criteria.

Good reconstruction does not ensure useful generation or anomaly detection; validate shift cases and avoid interpreting reconstruction score as calibrated probability.

## D04-L03-Q03
See worked solution and validate the acceptance criteria.

Confusing α_t and cumulative ᾱ_t mis-scales noise; check endpoints and use scheduler-consistent prediction parameterization.

## D04-L04-Q03
See worked solution and validate the acceptance criteria.

Evaluating one seed can reward lucky initialization; average across seeds and distinguish observed reward from expected regret.

## C01-L01-Q03
Convert at library boundaries and document normalization ranges.

Displaying BGR as RGB swaps red and blue. Convert at library boundaries and document normalization ranges.

## C01-L02-Q03
See worked solution and validate the acceptance criteria.

Large erosion removes thin defects; evaluate object retention and noise reduction against annotated examples.

## C01-L03-Q03
See worked solution and validate the acceptance criteria.

A homography fitted to four points exactly may be wrong for nonplanar scenes; inspect additional correspondences and camera geometry.

## C02-L01-Q03
See worked solution and validate the acceptance criteria.

Applying random augmentation to validation changes reported metric across runs; use deterministic transforms and preserve labels.

## C02-L02-Q03
See worked solution and validate the acceptance criteria.

Using pretrained model with wrong channel order or normalization silently hurts accuracy; follow model card and verify sample inputs.

## C03-L01-Q03
Use class-aware suppression unless task explicitly needs otherwise.

Class-agnostic NMS removes overlapping different objects. Use class-aware suppression unless task explicitly needs otherwise.

## C03-L02-Q03
Round-trip transform annotations and plot on image.

Mixing normalized center-width-height with pixel corners corrupts training. Round-trip transform annotations and plot on image.

## C03-L03-Q03
See worked solution and validate the acceptance criteria.

Pixel accuracy can be high on mostly background images; report class-specific overlap and object-level failure cases.

## C03-L04-Q03
See worked solution and validate the acceptance criteria.

Comparing SAM with ground-truth box prompts to fully automatic U-Net is not equivalent; disclose prompt information and report separate tracks.

## C04-L01-Q03
See worked solution and validate the acceptance criteria.

Nearest-neighbor association swaps IDs at crossings; add motion prediction/appearance and evaluate on crossing cases.

## C04-L02-Q03
Tune on development images and freeze templates.

Choosing prompts after seeing test labels overfits benchmark. Tune on development images and freeze templates.

## C04-L03-Q03
See worked solution and validate the acceptance criteria.

Comparing normalized vs original-size boxes breaks source citations; retain page coordinates and transformation metadata.

## G01-L01-Q03
See worked solution and validate the acceptance criteria.

Using a free-form model for arithmetic or authorization introduces avoidable errors; delegate deterministic decisions to verified functions.

## G01-L02-Q03
See worked solution and validate the acceptance criteria.

Counting words underestimates chat overhead; measure rendered messages with actual tokenizer and check provider context limit separately.

## G01-L03-Q03
See worked solution and validate the acceptance criteria.

A consistently wrong answer looks reproducible; evaluate correctness and schema compliance, not just identical outputs.

## G01-L04-Q03
Run the same local evaluation and disclose revision and hardware.

Comparing advertised benchmarks across different datasets or prompts misleads. Run the same local evaluation and disclose revision and hardware.

## G02-L01-Q03
Audit overlap and label quality.

An example copies test content or contains incorrect labels, inflating performance or teaching wrong patterns. Audit overlap and label quality.

## G02-L02-Q03
Add business checks and source verification after schema validation.

Valid JSON can have invented evidence or unsupported confidence. Add business checks and source verification after schema validation.

## G02-L03-Q03
See worked solution and validate the acceptance criteria.

A persona says it may ignore access policy; enforce permission in application code, not a prompt claim.

## G02-L04-Q03
Use its provided chat template and test round trip.

Manually concatenating a generic INST prompt for an incompatible model yields malformed role boundaries. Use its provided chat template and test round trip.

## G02-L05-Q03
See worked solution and validate the acceptance criteria.

Changing model and prompt simultaneously makes attribution impossible; isolate changes and repeat stochastic runs.

## G03-L01-Q03
See worked solution and validate the acceptance criteria.

Mixing embeddings from different model revisions or returning results before applying tenant filter yields wrong or unauthorized evidence.

## G03-L02-Q03
Implement version-aware upsert and tombstone/cleanup.

Appending revised chunks without deleting stale records creates conflicting evidence. Implement version-aware upsert and tombstone/cleanup.

## G03-L03-Q03
Evaluate entailment/faithfulness separately and show source snippets.

A valid citation ID does not imply the cited text supports the claim. Evaluate entailment/faithfulness separately and show source snippets.

## G03-L04-Q03
See worked solution and validate the acceptance criteria.

A single average conceals no-answer failures; stratify by answerability and report denominators and per-query traces.

## G04-L01-Q03
Use gold examples and external evidence checks; measure false-accept rate.

Letting a model approve its own unsupported answer can reinforce hallucination. Use gold examples and external evidence checks; measure false-accept rate.

## G04-L02-Q03
Authorize sources and redact/deny queries before retrieval; retain provenance.

A fallback leaks confidential queries to an external service or inserts stale documents. Authorize sources and redact/deny queries before retrieval; retain provenance.

## G04-L03-Q03
Add max attempts, evidence-change check and terminal failure state.

An unbounded verifier loop increases cost while never resolving a missing document. Add max attempts, evidence-change check and terminal failure state.

## G04-L04-Q03
See worked solution and validate the acceptance criteria.

Agent repeatedly searches irrelevant indices and misses SLA; impose route/tool budget, timeouts and explicit terminal conditions.

## G05-L01-Q03
Enforce tenant from authenticated context, not caller-supplied fields.

A valid JSON argument references another tenant's record. Enforce tenant from authenticated context, not caller-supplied fields.

## G05-L02-Q03
See worked solution and validate the acceptance criteria.

A model repeats the same tool indefinitely; detect repeated calls, budget attempts and terminate with a useful error.

## G05-L03-Q03
See worked solution and validate the acceptance criteria.

A judge gives higher score to verbose but wrong answers; anchor rubric to facts and run blind human review of disagreements.

## G05-L04-Q03
Restrict capabilities per worker and validate merged provenance.

Giving each specialist every tool defeats least privilege. Restrict capabilities per worker and validate merged provenance.

## G06-L01-Q03
See worked solution and validate the acceptance criteria.

Leaking provider exceptions or message classes into business logic makes migration and error handling brittle; normalize at boundary.

## G06-L02-Q03
Return explicit updates and type-check state keys.

Mutating shared state in place obscures replay behavior. Return explicit updates and type-check state keys.

## G06-L03-Q03
Define merge contract and test fan-in under reordered completion.

Parallel nodes writing same key without reducer may error or overwrite. Define merge contract and test fan-in under reordered completion.

## G06-L04-Q03
Place side effects behind approval and transactional idempotency.

Performing a write before interrupt can duplicate it after resume. Place side effects behind approval and transactional idempotency.

## G07-L01-Q03
Validate capabilities, inputs and server identity.

Treating all MCP servers as trusted extensions permits instruction injection or excessive access. Validate capabilities, inputs and server identity.

## G07-L02-Q03
See worked solution and validate the acceptance criteria.

A public-looking resource returns private fields; return minimal approved schema and assert no internal keys in response.

## G07-L03-Q03
Bind tenant to verified identity and query constraints.

Passing user-supplied tenant as authorization context permits cross-tenant access. Bind tenant to verified identity and query constraints.

## G08-L01-Q03
See worked solution and validate the acceptance criteria.

A temporary request becomes permanent preference without consent; distinguish session-only from persistable and permit correction/deletion.

## G08-L02-Q03
See worked solution and validate the acceptance criteria.

Post-filtering results after cross-tenant retrieval may leak via logs or caches; enforce authorization in data access and test isolation.

## G08-L03-Q03
See worked solution and validate the acceptance criteria.

A delete only removes display record but leaves vector entry; test retrieval and storage-level deletion, including cache behavior.

## G09-L01-Q03
See worked solution and validate the acceptance criteria.

Calling blocking inference directly inside async endpoint stalls event loop; move CPU work to appropriate executor or separate inference service.

## G09-L02-Q03
See worked solution and validate the acceptance criteria.

A generator catches cancellation as generic error and keeps generating; ensure cleanup in finally and test canceled iteration.

## G09-L03-Q03
Enforce equivalent policy constraints and disclose chosen model in trace.

Fallback silently changes model capabilities or data region. Enforce equivalent policy constraints and disclose chosen model in trace.

## G09-L04-Q03
Require authenticated policy checks and fail closed on unavailable policy service.

Using model decision as sole authorization creates bypass. Require authenticated policy checks and fail closed on unavailable policy service.

## G10-L01-Q03
Require claim-level anchors and independent human sample.

A judge rewards longer answer without checking evidence. Require claim-level anchors and independent human sample.

## G10-L02-Q03
Separate jobs and mark skipped explicitly when no credentials.

Treating judge-dependent tests as offline makes CI flaky and costly. Separate jobs and mark skipped explicitly when no credentials.

## G10-L03-Q03
See worked solution and validate the acceptance criteria.

Passing reference text as retrieved context artificially improves faithfulness; keep actual retrieval evidence separate from reference answer.

## G10-L04-Q03
See worked solution and validate the acceptance criteria.

Only evaluating happy paths overlooks injection and format failures; keep adversarial holdouts and fail closed on protected action.

## G10-L05-Q03
See worked solution and validate the acceptance criteria.

Averages hide tail latency and failures; use percentiles and per-slice results, redact prompt/response logs and limit retention.

## G11-L01-Q03
See worked solution and validate the acceptance criteria.

Using test examples in training or wrong chat format invalidates benchmark; inspect rendered examples and data provenance.

## G11-L02-Q03
See worked solution and validate the acceptance criteria.

Estimating only weights undercounts memory and can cause OOM at long contexts; include KV cache, workspaces and concurrency.

## G11-L03-Q03
See worked solution and validate the acceptance criteria.

Using an image generator for factual document extraction is mismatched; test OCR fidelity and citation geometry instead.

## P01-L01-Q03
See worked solution and validate the acceptance criteria.

Loading untrusted pickle/joblib can execute code; restrict artifact origin and integrity verification.

## P01-L02-Q03
See worked solution and validate the acceptance criteria.

Comparing runs trained on different splits conflates data change and model change; align manifests and evaluation datasets.

## P01-L03-Q03
See worked solution and validate the acceptance criteria.

Treating retraining as automatic deployment can promote degraded models; require independent quality/safety gates and rollback.

## P02-L01-Q03
See worked solution and validate the acceptance criteria.

Automatically retraining on every drift alert may worsen performance; investigate data integrity, seasonality and actual quality first.

## P02-L02-Q03
See worked solution and validate the acceptance criteria.

A checklist with no test evidence or owner cannot demonstrate effectiveness; require concrete evidence and signoff.

## P02-L03-Q03
Set concurrency, backpressure, retry budgets and alarms.

Autoscaling workers without provider quota or budget limits amplifies failures/cost. Set concurrency, backpressure, retry budgets and alarms.

## F01-L01-Q04
D

The kernel executable identifies the environment actually executing code.

## F02-L03-Q04
C

90 true positives and 495 false positives per 10,000 yield 90/585.

## M01-L02-Q04
D

A group split prevents the same customer appearing on both sides.

## M02-L02-Q04
C

Threshold is a policy decision tuned on validation, not the final test.

## M03-L03-Q04
D

Brier is the average (p-y)^2 and assesses probability accuracy.

## M04-L01-Q04
D

DBSCAN can label points outside dense regions as noise.

## M05-L01-Q04
C

Forecast origins must have access only to past observations.

## D01-L03-Q04
C

Prediction is 7; derivative is 2*(7-4)*3.

## D02-L01-Q04
A

A plain mean of batch means overweights smaller batches.

## D03-L03-Q04
C

Masking logits prevents future positions receiving probability mass.

## D04-L03-Q04
D

Cumulative alpha decreases while noise contribution increases.

## C01-L01-Q04
D

BGR to RGB swaps first and third channels.

## C02-L01-Q04
C

Evaluation should represent consistent inference behavior.

## C03-L01-Q04
D

Union is 4+4-1=7; intersection is 1.

## C04-L01-Q04
A

Identity continuity is a tracking-specific property.

## G01-L02-Q04
B

The actual tokenized prompt and generation allowance determine fit.

## G02-L02-Q04
D

Schema validation checks structure, not factual grounding.

## G03-L03-Q04
C

Grounding needs claim-level support beyond ID membership.

## G04-L02-Q04
D

Corrective retrieval assesses evidence and selects a correction path.

## G05-L01-Q04
A

The application must enforce permission before execution.

## G06-L04-Q04
A

Checkpoint/replay does not guarantee exactly-once external effects.

## G07-L01-Q04
A

They are separate protocol capabilities with distinct contracts.

## G08-L02-Q04
D

Retrieval must never expose another user's memory.

## G09-L02-Q04
C

SSE framing uses line fields and an empty line delimiter.

## G10-L01-Q04
B

Order swaps help reveal preference unrelated to correctness.

## G11-L01-Q04
C

r*(d_in+d_out)=8*8192.

## P01-L03-Q04
D

A gate prevents unapproved regressions reaching production.

## P02-L01-Q04
C

Input shift alone does not establish a change in P(y given x).