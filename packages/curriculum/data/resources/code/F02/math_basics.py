import numpy as np
p = .9*.01 / (.9*.01 + .05*.99)
assert abs(p - .153846) < 1e-5
w = 0.
for _ in range(50): w -= .1 * 2*(w-3)
assert abs(w-3) < .001
A = np.array([[1.,2.],[3.,4.]])
u,s,vt = np.linalg.svd(A, full_matrices=False)
assert np.allclose((u*s)@vt,A)
print('Posterior',p,'optimum',w)
