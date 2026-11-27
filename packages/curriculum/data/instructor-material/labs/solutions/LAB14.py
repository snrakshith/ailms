from dataclasses import dataclass
@dataclass(frozen=True)
class Memory:
    id:str; owner:str; text:str; expires:int
class Store:
    def __init__(self):self.data={}
    def upsert(self,authenticated_owner,item):
        if item.owner!=authenticated_owner:raise PermissionError
        self.data[(authenticated_owner,item.id)]=item
    def search(self,owner,query,now):
        return [x.id for (o,_),x in self.data.items() if o==owner and x.expires>now and query.lower() in x.text.lower()]
    def delete(self,owner,id):self.data.pop((owner,id),None)
def main():
    s=Store();s.upsert('a',Memory('1','a','blue car',10));s.upsert('b',Memory('1','b','blue car',20));assert s.search('a','blue',0)==['1']
    s.upsert('a',Memory('1','a','green car',10));assert s.search('a','blue',0)==[]
    assert s.search('a','green',10)==[];s.delete('a','1');assert s.search('a','green',0)==[] and s.search('b','blue',0)==['1']
    try:s.upsert('a',Memory('2','b','denied',10));raise AssertionError('expected deny')
    except PermissionError:pass
    print('scope, update, expiry, deletion and cross-tenant denial passed; in-memory fixture only')
if __name__=='__main__':main()
