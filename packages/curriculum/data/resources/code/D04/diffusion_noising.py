import torch
torch.manual_seed(3)
x=torch.ones(1000); eps=torch.randn_like(x)
for alpha_bar in (.99,.5,.01):
    noisy=alpha_bar**.5*x+(1-alpha_bar)**.5*eps
    print(alpha_bar, (noisy-x).square().mean().item())
# Forward process only; reverse denoising requires a learned predictor.
