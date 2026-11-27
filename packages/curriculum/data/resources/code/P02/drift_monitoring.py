import numpy as np
rng=np.random.default_rng(3)
base=rng.normal(0,1,1000); new=rng.normal(.8,1,1000)
shift=abs(new.mean()-base.mean())/base.std()
print('standardized mean shift',shift,'investigate',shift>.5)
# Threshold is illustrative: calibrate on historical windows and monitor labels separately.
