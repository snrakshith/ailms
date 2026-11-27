# Offline controller demonstration, not the original CRAG or Self-RAG training algorithm.
def answer(query, retrieve, grade, generate, verify, max_attempts=3):
    for attempt in range(max_attempts):
        evidence=retrieve(query,attempt)
        if not grade(evidence): continue
        draft=generate(query,evidence)
        if verify(draft,evidence): return {'answer':draft,'attempts':attempt+1,'status':'ok'}
    return {'answer':None,'attempts':max_attempts,'status':'abstain'}
result=answer('leave',lambda q,i: [] if i==0 else ['20 days'],bool,lambda q,e:e[0],lambda d,e:d in e)
assert result=={'answer':'20 days','attempts':2,'status':'ok'}
assert answer('unknown',lambda q,i:[],bool,lambda q,e:'',lambda d,e:False)['status']=='abstain'
print(result)
