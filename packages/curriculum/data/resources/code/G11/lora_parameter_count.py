import torch
from torch import nn
base=nn.Linear(16,8,bias=False); base.requires_grad_(False)
r=2; A=nn.Parameter(torch.randn(r,16)*.01); B=nn.Parameter(torch.zeros(8,r))
x=torch.randn(4,16)
y=base(x)+x@A.T@B.T  # scale alpha/r omitted for this teaching example (equal to 1)
y.square().mean().backward()
assert base.weight.grad is None and B.grad is not None
print('base',base.weight.numel(),'trainable adapter',A.numel()+B.numel())
