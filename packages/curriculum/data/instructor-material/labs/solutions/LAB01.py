import numpy as np

def standardize(X):
    X=np.asarray(X,dtype=float)
    if X.ndim!=2 or len(X)==0 or not np.isfinite(X).all(): raise ValueError('finite nonempty matrix required')
    mu=X.mean(axis=0); sd=X.std(axis=0)
    return (X-mu)/np.where(sd==0,1,sd),mu,sd

def main():
    z,mu,sd=standardize([[1,2,7],[3,4,7],[5,6,7]])
    assert np.allclose(z.mean(0),0) and np.allclose(z.std(0),[1,1,0])
    assert z.shape==(3,3) and np.isfinite(z).all()
    print('standardized:',z.tolist(),'mean:',mu.tolist(),'std:',sd.tolist())
if __name__=='__main__': main()
