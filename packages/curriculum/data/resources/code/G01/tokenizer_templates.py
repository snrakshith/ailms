from transformers import AutoTokenizer
import os
# Select an instruction model whose tokenizer defines a chat template.
model_id=os.environ['HF_MODEL_ID']
tok=AutoTokenizer.from_pretrained(model_id,revision=os.environ['HF_REVISION'],trust_remote_code=False)
messages=[{'role':'user','content':'Explain vectors in one sentence.'}]
ids=tok.apply_chat_template(messages,tokenize=True,add_generation_prompt=True)
print(tok.apply_chat_template(messages,tokenize=False,add_generation_prompt=True))
print('Tokenized chat:',ids)
