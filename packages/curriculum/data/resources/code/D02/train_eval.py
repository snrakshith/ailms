import torch
from torch.utils.data import TensorDataset, DataLoader
torch.manual_seed(1)
X=torch.randn(160,4); y=(X.sum(1)>0).long()
train=DataLoader(TensorDataset(X[:120],y[:120]),batch_size=16,shuffle=True)
model=torch.nn.Sequential(torch.nn.Linear(4,16),torch.nn.ReLU(),torch.nn.Dropout(.1),torch.nn.Linear(16,2))
opt=torch.optim.AdamW(model.parameters(),lr=.01)
for epoch in range(5):
    model.train()
    for xb,yb in train:
        opt.zero_grad(); loss=torch.nn.functional.cross_entropy(model(xb),yb); loss.backward(); opt.step()
    model.eval()
    with torch.inference_mode(): print(epoch,(model(X[120:]).argmax(1)==y[120:]).float().mean().item())
