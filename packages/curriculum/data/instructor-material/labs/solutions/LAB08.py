def route(score,primary,fallback):
    if score>=.8:return ('strong',primary) if primary else ('abstain',[])
    if score>=.4 and fallback:return ('ambiguous',list(dict.fromkeys(primary+fallback)))
    if fallback:return ('weak',fallback)
    return ('abstain',[])
def verify_loop(drafts,allowed,max_attempts=3):
    trace=[]
    for d in drafts[:max_attempts]:
        # Toy verifier: fixture claim must exactly match trusted fact for cited ID.
        ok=d.get('id') in allowed and allowed[d['id']]==d.get('claim')
        trace.append({'id':d.get('id'),'passed':ok})
        if ok:return {'status':'ok','draft':d,'trace':trace}
    return {'status':'abstain','trace':trace}
def main():
    assert route(.9,['p'],['f'])[0]=='strong' and route(.6,['p'],['f'])[0]=='ambiguous'
    assert route(.1,[],['f'])[0]=='weak' and route(.1,[],[])[0]=='abstain'
    bad={'id':'p','claim':'wrong'};good={'id':'p','claim':'right'}
    assert verify_loop([bad]*4,{'p':'right'})['status']=='abstain'
    assert len(verify_loop([bad]*4,{'p':'right'})['trace'])==3
    assert verify_loop([bad,good],{'p':'right'})['status']=='ok';print(verify_loop([bad,good],{'p':'right'}))
if __name__=='__main__':main()
