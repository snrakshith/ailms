class Memory:
    def __init__(self): self.records={}
    def put(self,user,key,value): self.records[(user,key)]=value
    def search(self,user,query): return [v for (u,k),v in self.records.items() if u==user and query.lower() in k.lower()]
    def delete(self,user,key): self.records.pop((user,key),None)
m=Memory(); m.put('u1','language','Python'); m.put('u2','language','Java')
assert m.search('u1','language')==['Python']
m.delete('u1','language'); assert not m.search('u1','language')
print('scope and delete checks passed')
# This is a fake store; authenticated identity must come from the runtime.
