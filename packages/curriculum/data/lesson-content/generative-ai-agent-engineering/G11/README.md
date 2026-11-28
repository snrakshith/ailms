# G11: LLM adaptation and multimodal AI

## Module map

```mermaid
flowchart TD
    N1["Licensed dataset"]
    N2["Format with chat template"]
    N3["Frozen base + LoRA"]
    N4["Adapter training"]
    N5["Holdout evaluation"]
    N6["Serving"]
    N1 --> N2
    N2 --> N3
    N3 --> N4
    N4 --> N5
    N5 --> N6
```

## Lessons

- [Fine-tuning datasets, SFT and PEFT/LoRA](G11-L01.md) — intermediate
- [QLoRA, quantization, serving and model optimization](G11-L02.md) — advanced
- [Multimodal LLMs, diffusion apps and fine-tuning decisions](G11-L03.md) — advanced

Complete each exercise and demonstrate the related module examples.
