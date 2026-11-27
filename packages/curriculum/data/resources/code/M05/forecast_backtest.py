import numpy as np
rng = np.random.default_rng(7)
y = 20+np.sin(np.arange(100)*2*np.pi/7)+rng.normal(0,.2,100)
for cutoff in (50,65,80):
    history = y[:cutoff]
    actual = y[cutoff:cutoff+7]
    baseline = history[-7:]
    assert len(actual)==len(baseline)
    print(cutoff, np.mean(abs(actual-baseline)))
