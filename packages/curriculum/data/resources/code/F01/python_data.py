import numpy as np
import pandas as pd
x = np.array([[1., 2., 5.], [3., 4., 5.]])
scale = x.std(axis=0)
z = (x - x.mean(axis=0)) / np.where(scale == 0, 1, scale)
assert np.isfinite(z).all()
assert np.allclose(z[:, :2].mean(axis=0), 0)
frame = pd.DataFrame({'group':['A','B','A'], 'score':[1,2,None]})
print(z, frame.groupby('group').score.mean(), sep='\n')
