DOCS={'leave':'Annual leave is 20 days.','travel':'Receipts are required.'}

def retrieve(query):
    # TODO: return relevant document IDs and text.
    raise NotImplementedError

def answer(query):
    # TODO: return grounded answer and citation IDs, or abstain.
    raise NotImplementedError

if __name__=='__main__':
    assert answer('spaceship')['status']=='abstain'
    result=answer('annual leave')
    assert result['status']=='ok' and 'leave' in result['citations']
