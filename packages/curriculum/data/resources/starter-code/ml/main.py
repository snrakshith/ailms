from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

def build_model():
    # TODO: return a preprocessing + classifier pipeline.
    raise NotImplementedError

if __name__=='__main__':
    X,y=load_iris(return_X_y=True)
    Xtr,Xte,ytr,yte=train_test_split(X,y,stratify=y,test_size=.25,random_state=7)
    # TODO: tune only on Xtr/ytr. Evaluate the final model once.
    model=build_model().fit(Xtr,ytr)
    print(model.score(Xte,yte))
