import torch
from torch import nn
model=nn.Sequential(nn.Conv2d(3,8,3,padding=1),nn.ReLU(),nn.MaxPool2d(2),nn.AdaptiveAvgPool2d(1),nn.Flatten(),nn.Linear(8,3))
x=torch.randn(4,3,32,32)
assert model(x).shape==(4,3)
print('batch logits',model(x).shape)
# Replace synthetic tensors with audited, group-split labeled images for training.
