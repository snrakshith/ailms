import torch

def main():
    torch.set_num_threads(1);torch.manual_seed(7)
    base=torch.nn.Linear(4,3,bias=False);base.requires_grad_(False)
    A=torch.nn.Parameter(torch.randn(2,4)*.01);B=torch.nn.Parameter(torch.zeros(3,2))
    x=torch.randn(32,4);target=x@torch.tensor([[1.,0.,0.],[0.,1.,0.],[0.,0.,1.],[0.,0.,0.]])
    old=base.weight.detach().clone();opt=torch.optim.Adam([A,B],lr=.03)
    def loss():return ((base(x)+(x@A.T)@B.T-target)**2).mean()
    start=loss().item()
    for _ in range(200):opt.zero_grad();l=loss();l.backward();opt.step()
    end=loss().item();assert torch.equal(old,base.weight) and end<start and A.numel()+B.numel()==14
    print({'start_loss':start,'end_loss':end,'adapter_weights':14,'base_weights':12,'note':'Tiny dimensions make adapter larger; real low-rank savings require r(d_in+d_out)<d_in*d_out.'})
if __name__=='__main__':main()
