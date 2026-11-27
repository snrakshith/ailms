import os
from litellm import completion
# Set LLM_MODEL to a provider-qualified model and configure credentials in env.
response=completion(model=os.environ['LLM_MODEL'],messages=[{'role':'user','content':'Return a one-sentence explanation of RAG.'}],max_tokens=100,timeout=20)
print(response.choices[0].message.content)
