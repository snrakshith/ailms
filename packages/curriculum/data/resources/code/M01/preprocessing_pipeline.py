import numpy as np
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.pipeline import make_pipeline
from sklearn.linear_model import LogisticRegression
X = np.array([[20,'a'],[40,'b'],[30,'a'],[50,'b'],[np.nan,'a'],[60,'b']], dtype=object)
pre = ColumnTransformer([('num',make_pipeline(SimpleImputer(strategy='median'),StandardScaler()),[0]),('cat',OneHotEncoder(handle_unknown='ignore'),[1])])
model = make_pipeline(pre,LogisticRegression()).fit(X,[0,1,0,1,0,1])
assert model.predict([[None,'new']]).shape == (1,)
print(model.predict_proba([[35,'new']]))
