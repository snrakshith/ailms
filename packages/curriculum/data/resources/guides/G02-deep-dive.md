# Prompt engineering pattern library

Use one synthetic support classification task. Keep the output vocabulary fixed (`billing`, `technical`, `other`) and evaluate on held-out examples.

| Pattern             | Example prompt                                                                                       | When to use                                                          |
| ------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Zero-shot           | Classify the message into billing, technical, or other. Return only the label.                       | Clear categories, strong model                                       |
| One-shot            | Example: My invoice is wrong → billing. Now classify the input.                                      | Clarify a format or mapping; not a determinism guarantee             |
| Few-shot            | Invoice wrong → billing; app crashes → technical; say hello → other. Now classify the input.         | Boundary examples and format consistency                             |
| Structured few-shot | Return JSON conforming to the supplied schema. Example: {"category":"billing","needs_review":false}. | Typed downstream integration                                         |
| Persona             | You are a support triage assistant. Use the categories only, and flag ambiguity.                     | Audience and scope                                                   |
| Reasoning-oriented  | Return label, evidence phrase from the message and a concise justification.                          | Auditable result; evaluate the evidence rather than hidden reasoning |

## Serialization is model-specific

Conceptual examples only (not exact templates for all models):

```text
ChatML style:
<|im_start|>user
Explain vectors.<|im_end|>
<|im_start|>assistant

Alpaca style:
### Instruction:
Explain vectors.
### Response:

INST style:
[INST] Explain vectors. [/INST]
```

Do not manually transplant these into an arbitrary model. Use `tokenizer.apply_chat_template(messages, tokenize=True, add_generation_prompt=True)` when supported, inspect the tokenizer's role markers and avoid duplicate special tokens. For hosted chat APIs, pass message objects rather than pre-serialized text unless documented otherwise.

## Structured validation example

A schema can constrain `category` to a Literal enum, require a Boolean `needs_review` and forbid unknown fields. Validate generated JSON with Pydantic; then verify semantic rules such as whether the evidence quote is actually present. Schema validity is not truthfulness. Retries must be bounded; invalid output can route to human review.

**Lab:** create 30 synthetic examples; hold out 15, compare zero/one/few-shot, record format error rate and accuracy, vary temperature independently, add ambiguous and instruction-injection fixtures. Never use the holdout to select examples.
