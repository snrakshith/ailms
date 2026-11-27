from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split, KFold, cross_val_score
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge
from sklearn.dummy import DummyRegressor
from sklearn.metrics import mean_absolute_error

def main():
    X,y=load_diabetes(return_X_y=True,scaled=False)
    Xd,Xt,yd,yt=train_test_split(X,y,test_size=.2,random_state=42)
    cv=KFold(5,shuffle=True,random_state=42)
    candidates={'baseline':DummyRegressor(strategy='median'),**{f'ridge-{a}':make_pipeline(StandardScaler(),Ridge(alpha=a)) for a in [.1,1,10,100]}}
    scores={name:-cross_val_score(m,Xd,yd,cv=cv,scoring='neg_mean_absolute_error').mean() for name,m in candidates.items()}
    best=min(scores,key=scores.get); model=candidates[best].fit(Xd,yd)
    print({'cv_MAE':scores,'selected':best,'holdout_MAE':mean_absolute_error(yt,model.predict(Xt))});assert best in candidates
if __name__=='__main__':main()
