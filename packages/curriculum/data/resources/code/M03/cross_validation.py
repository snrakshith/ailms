from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, StratifiedKFold, RandomizedSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import average_precision_score
X,y = load_breast_cancer(return_X_y=True)
Xtr,Xte,ytr,yte = train_test_split(X,y,stratify=y,test_size=.25,random_state=2)
search = RandomizedSearchCV(RandomForestClassifier(n_estimators=30,random_state=2),{'max_depth':[2,4,None],'min_samples_leaf':[1,3,5]},n_iter=3,cv=StratifiedKFold(3,shuffle=True,random_state=2),scoring='average_precision',random_state=2)
search.fit(Xtr,ytr)
print(search.best_params_,average_precision_score(yte,search.predict_proba(Xte)[:,1]))
