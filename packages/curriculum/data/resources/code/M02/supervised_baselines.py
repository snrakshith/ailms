from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.dummy import DummyClassifier
from sklearn.metrics import balanced_accuracy_score
X,y = load_breast_cancer(return_X_y=True)
Xdev,Xte,ydev,yte = train_test_split(X,y,test_size=.2,random_state=7,stratify=y)
Xtr,Xval,ytr,yval = train_test_split(Xdev,ydev,test_size=.25,random_state=8,stratify=ydev)
models=[DummyClassifier(),make_pipeline(StandardScaler(),LogisticRegression(max_iter=1000)),RandomForestClassifier(n_estimators=50,random_state=7)]
scores=[]
for model in models:
    model.fit(Xtr,ytr)
    scores.append(balanced_accuracy_score(yval,model.predict(Xval)))
    print(type(model).__name__,'validation',scores[-1])
best=models[max(range(len(scores)),key=scores.__getitem__)]
best.fit(Xdev,ydev)
print('Selected model test score',balanced_accuracy_score(yte,best.predict(Xte)))
