# Expanded question bank

## F01-L01-Q03
A notebook succeeds only after running cell 9 first. Diagnose the issue and propose a verification or mitigation strategy.


## F01-L02-Q03
A default argument `out={}` accumulates previous calls. Diagnose the issue and propose a verification or mitigation strategy.


## F01-L03-Q03
A zero variance feature produces NaN; using axis=1 instead of axis=0 normalizes samples, not features. Diagnose the issue and propose a verification or mitigation strategy.


## F01-L04-Q03
A many-to-many merge doubles positive cases and inflates apparent performance. Diagnose the issue and propose a verification or mitigation strategy.


## F01-L05-Q03
A test passes alone but fails in the suite due to mutable global state. Diagnose the issue and propose a verification or mitigation strategy.


## F02-L01-Q03
Elementwise X*w returns a matrix, not scores. Diagnose the issue and propose a verification or mitigation strategy.


## F02-L02-Q03
Applying PCA to uncentered data measures variation around the origin; center using train statistics when variance around the mean is the goal.. Diagnose the issue and propose a verification or mitigation strategy.


## F02-L03-Q03
Confusing sensitivity with positive predictive value gives 90%. Diagnose the issue and propose a verification or mitigation strategy.


## F02-L04-Q03
Resampling individual time points breaks autocorrelation; use appropriate blocks or model-based intervals, and distinguish sample size from resample count.. Diagnose the issue and propose a verification or mitigation strategy.


## F02-L05-Q03
Looking only at loss hides sign oscillation. Diagnose the issue and propose a verification or mitigation strategy.


## F02-L06-Q03
Exponentiating large logits returns inf; avoid probabilities rounded to zero and use logits-based losses where possible.. Diagnose the issue and propose a verification or mitigation strategy.


## M01-L01-Q03
A feature contains actual future inventory adjustment. Diagnose the issue and propose a verification or mitigation strategy.


## M01-L02-Q03
Duplicate rows appear across splits; group by source entity or deduplicate before split, and audit timestamp ranges.. Diagnose the issue and propose a verification or mitigation strategy.


## M01-L03-Q03
Fitting the encoder before split leaks category information; put it inside the pipeline passed to cross-validation.. Diagnose the issue and propose a verification or mitigation strategy.


## M02-L01-Q03
Selecting degree 10 from training error encourages overfit; plot validation error and investigate extrapolation outside training range.. Diagnose the issue and propose a verification or mitigation strategy.


## M02-L02-Q03
Using .5 regardless of imbalance/cost may exceed budget or miss positives. Diagnose the issue and propose a verification or mitigation strategy.


## M02-L03-Q03
Distance model dominated by an unscaled income feature; inspect scaled distributions and use same folds for fair comparison.. Diagnose the issue and propose a verification or mitigation strategy.


## M02-L04-Q03
Training accuracy reaches 1.0 but validation declines; reduce depth, min_samples_leaf or use a forest and verify on unseen data.. Diagnose the issue and propose a verification or mitigation strategy.


## M02-L05-Q03
Using test as early-stopping eval_set leaks labels. Diagnose the issue and propose a verification or mitigation strategy.


## M02-L06-Q03
Feature selection performed using all labels leaks information; put SelectKBest inside pipeline and rerun cross-validation.. Diagnose the issue and propose a verification or mitigation strategy.


## M03-L01-Q03
Accuracy .97 masks rare-event errors; inspect confusion counts and business capacity rather than reporting accuracy alone.. Diagnose the issue and propose a verification or mitigation strategy.


## M03-L02-Q03
Search iterations increase after seeing test performance. Diagnose the issue and propose a verification or mitigation strategy.


## M03-L03-Q03
Oversampling before split duplicates positives into holdout; resample inside training only and do not change test prevalence.. Diagnose the issue and propose a verification or mitigation strategy.


## M03-L04-Q03
A subgroup with two examples has 100% error; report support and intervals, avoid broad claims or targeting based on unstable estimates.. Diagnose the issue and propose a verification or mitigation strategy.


## M04-L01-Q03
Treating DBSCAN noise as an ordinary cluster distorts silhouette. Diagnose the issue and propose a verification or mitigation strategy.


## M04-L02-Q03
Interpreting distances between t-SNE islands as real distances is unjustified; check original-space neighbors and repeat seeds.. Diagnose the issue and propose a verification or mitigation strategy.


## M04-L03-Q03
Training on contaminated data or reversing score sign hides real anomalies. Diagnose the issue and propose a verification or mitigation strategy.


## M05-L01-Q03
Random split permits future leakage; use ordered windows and avoid centered rolling features.. Diagnose the issue and propose a verification or mitigation strategy.


## M05-L02-Q03
Including held-out interactions in similarity matrix leaks targets. Diagnose the issue and propose a verification or mitigation strategy.


## M05-L03-Q03
Randomizing sessions when users see both experiences contaminates effects. Diagnose the issue and propose a verification or mitigation strategy.


## D01-L01-Q03
Calling `.detach()` or converting to NumPy before loss disconnects the gradient; inspect requires_grad and grad_fn.. Diagnose the issue and propose a verification or mitigation strategy.


## D01-L02-Q03
Applying sigmoid before BCEWithLogitsLoss applies sigmoid twice. Diagnose the issue and propose a verification or mitigation strategy.


## D01-L03-Q03
Mistaking sum for mean loss changes effective step scale with batch size. Diagnose the issue and propose a verification or mitigation strategy.


## D01-L04-Q03
Reusing optimizer moments across trials invalidates comparison; initialize weights and optimizer consistently.. Diagnose the issue and propose a verification or mitigation strategy.


## D02-L01-Q03
Averaging three batch means equally weights the final three examples too much; sum weighted losses and divide by count.. Diagnose the issue and propose a verification or mitigation strategy.


## D02-L02-Q03
Saving `best=model.state_dict()` without copying may retain references to changing tensors; deepcopy or serialize checkpoint immediately.. Diagnose the issue and propose a verification or mitigation strategy.


## D02-L03-Q03
Comparing asynchronous GPU timings without synchronization misreports throughput; warm up and synchronize around measurements.. Diagnose the issue and propose a verification or mitigation strategy.


## D03-L01-Q03
Flatten size mismatch occurs when stride/padding changes. Diagnose the issue and propose a verification or mitigation strategy.


## D03-L02-Q03
Using padded last timestep instead of true sequence end corrupts representation; gather last valid state or pack sequences.. Diagnose the issue and propose a verification or mitigation strategy.


## D03-L03-Q03
Applying mask after softmax leaves incorrect normalization; mask scores before softmax, avoid fully masked rows or define safe handling.. Diagnose the issue and propose a verification or mitigation strategy.


## D03-L04-Q03
Allowing target positions to attend to future target tokens during training creates leakage; use causal target mask.. Diagnose the issue and propose a verification or mitigation strategy.


## D04-L01-Q03
Frozen parameters do not guarantee batch-norm running stats stay fixed; set frozen modules to eval if required.. Diagnose the issue and propose a verification or mitigation strategy.


## D04-L02-Q03
Good reconstruction does not ensure useful generation or anomaly detection; validate shift cases and avoid interpreting reconstruction score as calibrated probability.. Diagnose the issue and propose a verification or mitigation strategy.


## D04-L03-Q03
Confusing α_t and cumulative ᾱ_t mis-scales noise; check endpoints and use scheduler-consistent prediction parameterization.. Diagnose the issue and propose a verification or mitigation strategy.


## D04-L04-Q03
Evaluating one seed can reward lucky initialization; average across seeds and distinguish observed reward from expected regret.. Diagnose the issue and propose a verification or mitigation strategy.


## C01-L01-Q03
Displaying BGR as RGB swaps red and blue. Diagnose the issue and propose a verification or mitigation strategy.


## C01-L02-Q03
Large erosion removes thin defects; evaluate object retention and noise reduction against annotated examples.. Diagnose the issue and propose a verification or mitigation strategy.


## C01-L03-Q03
A homography fitted to four points exactly may be wrong for nonplanar scenes; inspect additional correspondences and camera geometry.. Diagnose the issue and propose a verification or mitigation strategy.


## C02-L01-Q03
Applying random augmentation to validation changes reported metric across runs; use deterministic transforms and preserve labels.. Diagnose the issue and propose a verification or mitigation strategy.


## C02-L02-Q03
Using pretrained model with wrong channel order or normalization silently hurts accuracy; follow model card and verify sample inputs.. Diagnose the issue and propose a verification or mitigation strategy.


## C03-L01-Q03
Class-agnostic NMS removes overlapping different objects. Diagnose the issue and propose a verification or mitigation strategy.


## C03-L02-Q03
Mixing normalized center-width-height with pixel corners corrupts training. Diagnose the issue and propose a verification or mitigation strategy.


## C03-L03-Q03
Pixel accuracy can be high on mostly background images; report class-specific overlap and object-level failure cases.. Diagnose the issue and propose a verification or mitigation strategy.


## C03-L04-Q03
Comparing SAM with ground-truth box prompts to fully automatic U-Net is not equivalent; disclose prompt information and report separate tracks.. Diagnose the issue and propose a verification or mitigation strategy.


## C04-L01-Q03
Nearest-neighbor association swaps IDs at crossings; add motion prediction/appearance and evaluate on crossing cases.. Diagnose the issue and propose a verification or mitigation strategy.


## C04-L02-Q03
Choosing prompts after seeing test labels overfits benchmark. Diagnose the issue and propose a verification or mitigation strategy.


## C04-L03-Q03
Comparing normalized vs original-size boxes breaks source citations; retain page coordinates and transformation metadata.. Diagnose the issue and propose a verification or mitigation strategy.


## G01-L01-Q03
Using a free-form model for arithmetic or authorization introduces avoidable errors; delegate deterministic decisions to verified functions.. Diagnose the issue and propose a verification or mitigation strategy.


## G01-L02-Q03
Counting words underestimates chat overhead; measure rendered messages with actual tokenizer and check provider context limit separately.. Diagnose the issue and propose a verification or mitigation strategy.


## G01-L03-Q03
A consistently wrong answer looks reproducible; evaluate correctness and schema compliance, not just identical outputs.. Diagnose the issue and propose a verification or mitigation strategy.


## G01-L04-Q03
Comparing advertised benchmarks across different datasets or prompts misleads. Diagnose the issue and propose a verification or mitigation strategy.


## G02-L01-Q03
An example copies test content or contains incorrect labels, inflating performance or teaching wrong patterns. Diagnose the issue and propose a verification or mitigation strategy.


## G02-L02-Q03
Valid JSON can have invented evidence or unsupported confidence. Diagnose the issue and propose a verification or mitigation strategy.


## G02-L03-Q03
A persona says it may ignore access policy; enforce permission in application code, not a prompt claim.. Diagnose the issue and propose a verification or mitigation strategy.


## G02-L04-Q03
Manually concatenating a generic INST prompt for an incompatible model yields malformed role boundaries. Diagnose the issue and propose a verification or mitigation strategy.


## G02-L05-Q03
Changing model and prompt simultaneously makes attribution impossible; isolate changes and repeat stochastic runs.. Diagnose the issue and propose a verification or mitigation strategy.


## G03-L01-Q03
Mixing embeddings from different model revisions or returning results before applying tenant filter yields wrong or unauthorized evidence.. Diagnose the issue and propose a verification or mitigation strategy.


## G03-L02-Q03
Appending revised chunks without deleting stale records creates conflicting evidence. Diagnose the issue and propose a verification or mitigation strategy.


## G03-L03-Q03
A valid citation ID does not imply the cited text supports the claim. Diagnose the issue and propose a verification or mitigation strategy.


## G03-L04-Q03
A single average conceals no-answer failures; stratify by answerability and report denominators and per-query traces.. Diagnose the issue and propose a verification or mitigation strategy.


## G04-L01-Q03
Letting a model approve its own unsupported answer can reinforce hallucination. Diagnose the issue and propose a verification or mitigation strategy.


## G04-L02-Q03
A fallback leaks confidential queries to an external service or inserts stale documents. Diagnose the issue and propose a verification or mitigation strategy.


## G04-L03-Q03
An unbounded verifier loop increases cost while never resolving a missing document. Diagnose the issue and propose a verification or mitigation strategy.


## G04-L04-Q03
Agent repeatedly searches irrelevant indices and misses SLA; impose route/tool budget, timeouts and explicit terminal conditions.. Diagnose the issue and propose a verification or mitigation strategy.


## G05-L01-Q03
A valid JSON argument references another tenant's record. Diagnose the issue and propose a verification or mitigation strategy.


## G05-L02-Q03
A model repeats the same tool indefinitely; detect repeated calls, budget attempts and terminate with a useful error.. Diagnose the issue and propose a verification or mitigation strategy.


## G05-L03-Q03
A judge gives higher score to verbose but wrong answers; anchor rubric to facts and run blind human review of disagreements.. Diagnose the issue and propose a verification or mitigation strategy.


## G05-L04-Q03
Giving each specialist every tool defeats least privilege. Diagnose the issue and propose a verification or mitigation strategy.


## G06-L01-Q03
Leaking provider exceptions or message classes into business logic makes migration and error handling brittle; normalize at boundary.. Diagnose the issue and propose a verification or mitigation strategy.


## G06-L02-Q03
Mutating shared state in place obscures replay behavior. Diagnose the issue and propose a verification or mitigation strategy.


## G06-L03-Q03
Parallel nodes writing same key without reducer may error or overwrite. Diagnose the issue and propose a verification or mitigation strategy.


## G06-L04-Q03
Performing a write before interrupt can duplicate it after resume. Diagnose the issue and propose a verification or mitigation strategy.


## G07-L01-Q03
Treating all MCP servers as trusted extensions permits instruction injection or excessive access. Diagnose the issue and propose a verification or mitigation strategy.


## G07-L02-Q03
A public-looking resource returns private fields; return minimal approved schema and assert no internal keys in response.. Diagnose the issue and propose a verification or mitigation strategy.


## G07-L03-Q03
Passing user-supplied tenant as authorization context permits cross-tenant access. Diagnose the issue and propose a verification or mitigation strategy.


## G08-L01-Q03
A temporary request becomes permanent preference without consent; distinguish session-only from persistable and permit correction/deletion.. Diagnose the issue and propose a verification or mitigation strategy.


## G08-L02-Q03
Post-filtering results after cross-tenant retrieval may leak via logs or caches; enforce authorization in data access and test isolation.. Diagnose the issue and propose a verification or mitigation strategy.


## G08-L03-Q03
A delete only removes display record but leaves vector entry; test retrieval and storage-level deletion, including cache behavior.. Diagnose the issue and propose a verification or mitigation strategy.


## G09-L01-Q03
Calling blocking inference directly inside async endpoint stalls event loop; move CPU work to appropriate executor or separate inference service.. Diagnose the issue and propose a verification or mitigation strategy.


## G09-L02-Q03
A generator catches cancellation as generic error and keeps generating; ensure cleanup in finally and test canceled iteration.. Diagnose the issue and propose a verification or mitigation strategy.


## G09-L03-Q03
Fallback silently changes model capabilities or data region. Diagnose the issue and propose a verification or mitigation strategy.


## G09-L04-Q03
Using model decision as sole authorization creates bypass. Diagnose the issue and propose a verification or mitigation strategy.


## G10-L01-Q03
A judge rewards longer answer without checking evidence. Diagnose the issue and propose a verification or mitigation strategy.


## G10-L02-Q03
Treating judge-dependent tests as offline makes CI flaky and costly. Diagnose the issue and propose a verification or mitigation strategy.


## G10-L03-Q03
Passing reference text as retrieved context artificially improves faithfulness; keep actual retrieval evidence separate from reference answer.. Diagnose the issue and propose a verification or mitigation strategy.


## G10-L04-Q03
Only evaluating happy paths overlooks injection and format failures; keep adversarial holdouts and fail closed on protected action.. Diagnose the issue and propose a verification or mitigation strategy.


## G10-L05-Q03
Averages hide tail latency and failures; use percentiles and per-slice results, redact prompt/response logs and limit retention.. Diagnose the issue and propose a verification or mitigation strategy.


## G11-L01-Q03
Using test examples in training or wrong chat format invalidates benchmark; inspect rendered examples and data provenance.. Diagnose the issue and propose a verification or mitigation strategy.


## G11-L02-Q03
Estimating only weights undercounts memory and can cause OOM at long contexts; include KV cache, workspaces and concurrency.. Diagnose the issue and propose a verification or mitigation strategy.


## G11-L03-Q03
Using an image generator for factual document extraction is mismatched; test OCR fidelity and citation geometry instead.. Diagnose the issue and propose a verification or mitigation strategy.


## P01-L01-Q03
Loading untrusted pickle/joblib can execute code; restrict artifact origin and integrity verification.. Diagnose the issue and propose a verification or mitigation strategy.


## P01-L02-Q03
Comparing runs trained on different splits conflates data change and model change; align manifests and evaluation datasets.. Diagnose the issue and propose a verification or mitigation strategy.


## P01-L03-Q03
Treating retraining as automatic deployment can promote degraded models; require independent quality/safety gates and rollback.. Diagnose the issue and propose a verification or mitigation strategy.


## P02-L01-Q03
Automatically retraining on every drift alert may worsen performance; investigate data integrity, seasonality and actual quality first.. Diagnose the issue and propose a verification or mitigation strategy.


## P02-L02-Q03
A checklist with no test evidence or owner cannot demonstrate effectiveness; require concrete evidence and signoff.. Diagnose the issue and propose a verification or mitigation strategy.


## P02-L03-Q03
Autoscaling workers without provider quota or budget limits amplifies failures/cost. Diagnose the issue and propose a verification or mitigation strategy.


## F01-L01-Q04
Which check best detects a notebook using the wrong environment?
- A. Check only the terminal prompt
- B. Read the notebook filename
- C. Count executed cells
- D. Print sys.executable from the running kernel

## F02-L03-Q04
With prevalence 1%, sensitivity 90%, specificity 95%, what is P(disease given positive)?
- A. About 1%
- B. 95%
- C. About 15.4%
- D. 90%

## M01-L02-Q04
Which split best tests generalization to unseen customers?
- A. Random row split
- B. Duplicate records across folds
- C. Split by label only
- D. Group split by customer ID

## M02-L02-Q04
When should the classification decision threshold be selected?
- A. After optimizing final test accuracy
- B. Always at 0.5
- C. Using validation data and operating cost
- D. From training label balance alone

## M03-L03-Q04
What does a Brier score measure?
- A. Average number of false negatives
- B. Model inference speed
- C. Area under ROC curve
- D. Mean squared error of predicted probabilities

## M04-L01-Q04
Which algorithm can naturally mark sparse points as noise?
- A. Ordinary k-means
- B. Linear regression
- C. PCA
- D. DBSCAN

## M05-L01-Q04
Which evaluation avoids look-ahead in demand forecasting?
- A. Training on all dates first
- B. Random shuffled folds
- C. Expanding chronological windows
- D. Centered rolling mean including future demand

## D01-L03-Q04
For w=2, b=1, x=3, y=4 and squared loss, what is dL/dw?
- A. 6
- B. 3
- C. 18
- D. 9

## D02-L01-Q04
Why weight batch losses by number of examples?
- A. To estimate the per-example mean with unequal batch sizes
- B. To disable gradients
- C. To make the final batch count twice
- D. To change label distribution

## D03-L03-Q04
At what step is a causal attention mask applied?
- A. To token IDs only
- B. To optimizer learning rates
- C. Before softmax on attention scores
- D. After computing final predictions

## D04-L03-Q04
In forward diffusion, what generally happens to signal-to-noise as t increases?
- A. It stays exactly constant
- B. It increases without limit
- C. It depends only on text prompt length
- D. It decreases under the usual noising schedule

## C01-L01-Q04
What RGB value represents a pure red BGR pixel [0,0,255]?
- A. [255,255,255]
- B. [0,255,0]
- C. [0,0,255]
- D. [255,0,0]

## C02-L01-Q04
Which validation augmentation policy is most reproducible?
- A. Augment labels but not images
- B. Independent random flips each evaluation
- C. Deterministic inference transforms
- D. Untracked random crops

## C03-L01-Q04
What is IoU for two boxes of area 4 overlapping in area 1?
- A. 1/8
- B. 2/7
- C. 1/4
- D. 1/7

## C04-L01-Q04
What is a tracking ID switch?
- A. A tracked identity is assigned to a different object
- B. A pixel changes color
- C. A frame rate changes
- D. A detection gains confidence

## G01-L02-Q04
Which items count against a model context budget?
- A. Only generated text
- B. Rendered messages, tool schemas, retrieved context and reserved output
- C. Only raw word count
- D. Only the last user sentence

## G02-L02-Q04
What does a strict JSON schema not establish?
- A. Whether fields have required types
- B. Whether extra fields are rejected if forbidden
- C. Whether required fields exist
- D. Whether the factual claims are supported

## G03-L03-Q04
What does a citation ID validation alone establish?
- A. Every claim is factually supported
- B. The answer is complete
- C. The ID is in an allowed evidence set
- D. The source is always current

## G04-L02-Q04
What is the immediate focus of CRAG-style routing?
- A. Changing API serialization
- B. Optimizing adapter rank
- C. Increasing temperature
- D. Quality of retrieved evidence

## G05-L01-Q04
Who should authorize a tool invocation?
- A. Application policy using authenticated context
- B. The model's generated role label
- C. Any user-supplied tenant ID
- D. The tool description alone

## G06-L04-Q04
Where should a protected side effect happen?
- A. After approval, with durable idempotency
- B. Whenever a checkpoint exists
- C. In every replay of a node
- D. Before interrupt to save latency

## G07-L01-Q04
What is a key distinction between MCP resources and tools?
- A. Resources expose contextual data; tools execute operations
- B. Both automatically bypass authorization
- C. Tools cannot return data
- D. Resources always perform writes

## G08-L02-Q04
When should tenant access constraints be applied?
- A. After displaying all search results
- B. Only in the LLM prompt
- C. Only when a result looks private
- D. At authorized storage/query boundaries before exposing results

## G09-L02-Q04
What separates SSE events?
- A. A Python list index
- B. A new TCP connection per event
- C. A blank line
- D. A comma only

## G10-L01-Q04
How can position bias in a pairwise judge be detected?
- A. Only increase token budget
- B. Evaluate both answer orders and compare results
- C. Always put candidate first
- D. Use judge scores without labels

## G11-L01-Q04
How many LoRA weights are added to a 4096×4096 layer at rank 8, excluding bias?
- A. 16,777,216
- B. 32,768
- C. 65,536
- D. 4,096

## P01-L03-Q04
What should happen when a candidate fails an agreed model quality gate?
- A. Change the threshold after failure
- B. Delete all tests
- C. Deploy and tune later without review
- D. Block promotion and retain the prior approved artifact

## P02-L01-Q04
Does input distribution drift prove concept drift?
- A. Yes, always
- B. Only if model size decreases
- C. No; the relationship with target must be assessed separately
- D. Only if p95 latency rises