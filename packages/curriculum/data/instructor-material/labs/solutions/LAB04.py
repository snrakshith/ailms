import torch

def main():
    torch.set_num_threads(1);torch.manual_seed(7)
    X=torch.tensor([[0.,0.],[0.,1.],[1.,0.],[1.,1.]]);y=torch.tensor([[0.],[1.],[1.],[0.]])
    results={}
    for name,model in [('linear',torch.nn.Linear(2,1)),('mlp',torch.nn.Sequential(torch.nn.Linear(2,8),torch.nn.Tanh(),torch.nn.Linear(8,1)))]:
        opt=torch.optim.Adam(model.parameters(),lr=.05)
        for _ in range(500):
            opt.zero_grad();loss=torch.nn.functional.binary_cross_entropy_with_logits(model(X),y);loss.backward();opt.step()
        with torch.no_grad(): results[name]=float(((model(X)>0)==(y>0)).float().mean())
    assert results['mlp']==1 and results['linear']<1
    print(results,'truth table fit, not generalization benchmark')
if __name__=='__main__':main()
