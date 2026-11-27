import torch
x = torch.tensor([1.,2.,3.],requires_grad=True)
(x.square().sum()).backward()
assert torch.allclose(x.grad,2*x)
torch.manual_seed(7)
X = torch.tensor([[0.,0.],[0.,1.],[1.,0.],[1.,1.]])
y = torch.tensor([[0.],[1.],[1.],[0.]])
model = torch.nn.Sequential(torch.nn.Linear(2,8),torch.nn.Tanh(),torch.nn.Linear(8,1))
opt = torch.optim.AdamW(model.parameters(),lr=.05)
for _ in range(250):
    opt.zero_grad(); loss = torch.nn.functional.binary_cross_entropy_with_logits(model(X),y); loss.backward(); opt.step()
with torch.no_grad(): print(torch.sigmoid(model(X)))
