# LLM adaptation and serving decisions

## Prompting, retrieval or tuning?

Start with a task definition and representative evaluation examples. Prompt engineering is fast to iterate and suitable when behavior can be specified in instructions/examples. Retrieval provides changing or source-specific knowledge, supports citations and can enforce document permissions. Fine-tuning is useful for repeated behavior, domain formatting or task adaptation when sufficient licensed training examples exist. It does not reliably replace access to up-to-date facts or authorization. Evaluate a prompt/RAG baseline before training, and use an independent holdout separated by source or conversation rather than random duplicates.

## Adapter mechanics

For a dense layer W with dimensions d_out×d_in, LoRA adds B(d_out×r)A(r×d_in), often scaled by alpha/r. Freeze W and train the adapter; many implementations initialize one factor to zero so the initial delta is zero. Trainable weights are r(d_in+d_out) excluding optional bias and other modules. For 4096×4096 rank 8, 65,536 vs 16,777,216, approximately 0.39%. Total memory savings are not the same as trainable parameter savings because base weights and activations remain. QLoRA keeps the base in a compatible quantized representation and trains adapters, subject to hardware and backend constraints.

## Token contracts

The tokenizer's model-specific chat template determines role separators and generation markers. ChatML, Alpaca and INST are examples, not interchangeable standards. Render messages with the selected tokenizer, include all context/tool overhead, and reserve output tokens. Do not add special tokens twice. Training records should use the intended template and mask loss appropriately for the target method. Verify model card, license and revision before downloading weights or enabling remote code.

## Capacity estimates

Raw 7B weights at 16 bits require about 14 GB decimal; 4-bit weights about 3.5 GB before metadata and runtime overhead. KV cache often scales as 2×layers×batch×sequence×KV heads×head dimension×bytes per element, with implementation-dependent optimizations. Long contexts and concurrency can dominate memory. Benchmark on the actual deployment hardware using representative inputs, measuring warm p50/p95 time-to-first-token, output tokens/s, total response time, memory, schema failures and quality. Report any skipped hardware/provider path rather than inventing results.

## Rollout

Register base revision, adapter, tokenizer, training dataset hash, prompt schema and evaluation version. Test safety and regression against baseline, stage a canary, enforce concurrency/budget limits, and define rollback for model and prompt together. Do not treat a successful toy adapter fit as evidence of real LLM quality. LAB11 demonstrates frozen-weight mechanics on small tensors, not Hugging Face fine-tuning; the optional integration requires a reviewed checkpoint and target environment.
