from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import precision_score, recall_score, average_precision_score
import numpy as np

def select_threshold(y,p,capacity=.4):
    raise NotImplementedError("Learner TODO: select_threshold")

def main():
    X,y=load_breast_cancer(return_X_y=True);y=1-y # malignant positive; education only
    Xd,Xt,yd,yt=train_test_split(X,y,test_size=.2,stratify=y,random_state=42)
    Xtr,Xv,ytr,yv=train_test_split(Xd,yd,test_size=.25,stratify=yd,random_state=42)
    pipe=make_pipeline(StandardScaler(),LogisticRegression(max_iter=1000)).fit(Xtr,ytr)
    pv=pipe.predict_proba(Xv)[:,1];t=select_threshold(yv,pv)
    assert np.mean(pv>=t)<=.4
    pt=pipe.predict_proba(Xt)[:,1];pred=pt>=t
    print({'threshold':float(t),'validation_review_fraction':float(np.mean(pv>=t)),'test_precision':precision_score(yt,pred,zero_division=0),'test_recall':recall_score(yt,pred,zero_division=0),'test_AP':average_precision_score(yt,pt)})
if __name__=='__main__':main()
