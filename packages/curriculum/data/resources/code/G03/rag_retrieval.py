from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
# Sparse retrieval baseline; replace with dense embeddings and compare recall.
docs={'leave':'Annual leave is twenty days.', 'travel':'Travel claims require receipts.', 'security':'Never share passwords.'}
vec=TfidfVectorizer(); index=vec.fit_transform(docs.values())
def retrieve(query,k=2):
    scores=cosine_similarity(vec.transform([query]),index)[0]
    return [(list(docs)[i],float(scores[i])) for i in scores.argsort()[::-1][:k] if scores[i]>0]
assert retrieve('travel receipts')[0][0]=='travel'
assert retrieve('spaceship')==[]
print(retrieve('annual leave'))
