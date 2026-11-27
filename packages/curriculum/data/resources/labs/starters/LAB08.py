def route(score,primary,fallback):
    raise NotImplementedError("Learner TODO: route")
def verify_loop(drafts,allowed,max_attempts=3):
    raise NotImplementedError("Learner TODO: verify_loop")
def main():
    assert route(.9,['p'],['f'])[0]=='strong' and route(.6,['p'],['f'])[0]=='ambiguous'
    assert route(.1,[],['f'])[0]=='weak' and route(.1,[],[])[0]=='abstain'
    bad={'id':'p','claim':'wrong'};good={'id':'p','claim':'right'}
    assert verify_loop([bad]*4,{'p':'right'})['status']=='abstain'
    assert len(verify_loop([bad]*4,{'p':'right'})['trace'])==3
    assert verify_loop([bad,good],{'p':'right'})['status']=='ok';print(verify_loop([bad,good],{'p':'right'}))
if __name__=='__main__':main()
