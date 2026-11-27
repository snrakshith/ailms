import torch
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.metrics import f1_score

def main():
    torch.set_num_threads(1);torch.manual_seed(42)
    X,y=load_digits(return_X_y=True);X=X.reshape(-1,1,8,8)/16.
    Xd,Xt,yd,yt=train_test_split(X,y,test_size=.2,stratify=y,random_state=42)
    Xtr,Xv,ytr,yv=train_test_split(Xd,yd,test_size=.25,stratify=yd,random_state=42)
    def tensors(x,y):return torch.tensor(x,dtype=torch.float32),torch.tensor(y,dtype=torch.long)
    train=torch.utils.data.DataLoader(torch.utils.data.TensorDataset(*tensors(Xtr,ytr)),batch_size=64,shuffle=True,generator=torch.Generator().manual_seed(42))
    xv,yv=tensors(Xv,yv);xt,yt=tensors(Xt,yt)
    model=torch.nn.Sequential(torch.nn.Conv2d(1,8,3,padding=1),torch.nn.ReLU(),torch.nn.MaxPool2d(2),torch.nn.Flatten(),torch.nn.Linear(128,10))
    opt=torch.optim.Adam(model.parameters(),lr=.01);best=-1;state=None
    for e in range(12):
        model.train()
        for xb,yb in train:
            opt.zero_grad();loss=torch.nn.functional.cross_entropy(model(xb),yb);loss.backward();opt.step()
        model.eval()
        with torch.no_grad(): score=f1_score(yv,model(xv).argmax(1),average='macro')
        if score>best:best=score;state={k:v.clone() for k,v in model.state_dict().items()}
    model.load_state_dict(state);model.eval()
    with torch.no_grad(): test=f1_score(yt,model(xt).argmax(1),average='macro')
    assert 0<=test<=1 and model(xt[:1]).shape==(1,10)
    print({'validation_macro_F1':best,'test_macro_F1':test,'parameters':sum(p.numel() for p in model.parameters())})
if __name__=='__main__':main()
