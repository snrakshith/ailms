import torch
from math import sqrt
def causal_attention(q,k,v):
    scores=q@k.transpose(-1,-2)/sqrt(q.shape[-1])
    mask=torch.ones(scores.shape[-2:],dtype=torch.bool).triu(1)
    return scores.masked_fill(mask,float('-inf')).softmax(-1)@v
x=torch.randn(3,4); changed=x.clone(); changed[2]+=100
assert torch.allclose(causal_attention(x,x,x)[:2],causal_attention(changed,changed,changed)[:2])
print(causal_attention(x,x,x).shape)
