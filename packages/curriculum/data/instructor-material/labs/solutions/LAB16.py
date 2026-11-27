def evaluate(rows):
    a=[r for r in rows if r['gold']];u=[r for r in rows if not r['gold']]
    recall=sum(len(set(r['gold'])&set(r['retrieved']))/len(set(r['gold'])) for r in a)/len(a) if a else None
    abstention=sum(r['abstained'] for r in u)/len(u) if u else None
    supported=sum(r['supported_claims'] for r in rows); total=sum(r['claims'] for r in rows)
    return {'recall_at_k':recall,'unanswerable_abstention':abstention,'human_labeled_claim_support':supported/total if total else None}
def main():
    rows=[{'gold':['d1'],'retrieved':['d1'],'abstained':False,'supported_claims':1,'claims':2},{'gold':['d2'],'retrieved':['d3'],'abstained':False,'supported_claims':0,'claims':1},{'gold':[],'retrieved':[],'abstained':True,'supported_claims':0,'claims':0}]
    m=evaluate(rows);assert m['recall_at_k']==.5 and m['unanswerable_abstention']==1 and m['human_labeled_claim_support']==1/3
    print(m,'fixture labels; no LLM judge invoked')
if __name__=='__main__':main()
