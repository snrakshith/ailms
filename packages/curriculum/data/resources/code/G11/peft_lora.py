import os
from transformers import AutoModelForCausalLM
from peft import LoraConfig,get_peft_model
model=AutoModelForCausalLM.from_pretrained(os.environ['HF_MODEL_ID'],revision=os.environ['HF_REVISION'],trust_remote_code=False)
# Target modules depend on the architecture. Inspect named_modules before choosing.
config=LoraConfig(r=8,lora_alpha=16,target_modules=os.environ['LORA_TARGETS'].split(','),task_type='CAUSAL_LM')
model=get_peft_model(model,config); model.print_trainable_parameters()
# Next: format approved training data with the actual chat template, train SFT,
# evaluate against base model on held-out prompts, then save adapter artifacts.
