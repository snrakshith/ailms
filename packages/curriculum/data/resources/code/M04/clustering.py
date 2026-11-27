from sklearn.datasets import make_moons
from sklearn.cluster import DBSCAN,KMeans
from sklearn.metrics import silhouette_score
X,_ = make_moons(n_samples=300,noise=.04,random_state=7)
for model in [KMeans(n_clusters=2,n_init=10,random_state=7),DBSCAN(eps=.18,min_samples=5)]:
    labels = model.fit_predict(X)
    mask = labels != -1
    if len(set(labels[mask])) > 1: print(type(model).__name__,silhouette_score(X[mask],labels[mask]),'coverage',mask.mean())
# Inspect geometry too; silhouette can favor convex clusters.
