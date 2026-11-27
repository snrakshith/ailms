from sklearn.datasets import load_iris
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
import tempfile,joblib
from pathlib import Path
X,y=load_iris(return_X_y=True)
model=make_pipeline(StandardScaler(),LogisticRegression(max_iter=300)).fit(X[10:],y[10:])
with tempfile.TemporaryDirectory() as tmp:
    path=Path(tmp)/'trusted-local-model.joblib'; joblib.dump(model,path)
    restored=joblib.load(path) # only trusted artifacts; pickle can execute code
    assert (restored.predict(X[:10])==model.predict(X[:10])).all()
print('serialization parity passed; this is not a quality benchmark')
