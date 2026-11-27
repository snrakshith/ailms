import re,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
def words(s):return set(re.findall(r'[a-z0-9]+',s.lower()))
def retrieve(query,docs,tenant,k=2):
    raise NotImplementedError("Learner TODO: retrieve")
def answer(query,docs,tenant):
    raise NotImplementedError("Learner TODO: answer")
def main():
    docs=json.loads((ROOT/'datasets/policy-corpus.json').read_text());cases=json.loads((ROOT/'datasets/policy-eval.json').read_text())
    good=0
    for case in cases:
        result=answer(case['query'],docs,case['tenant']);expected=case['gold_ids']; good+=result['citations']==expected
        assert all(any(d['id']==x and d['tenant']==case['tenant'] for d in docs) for x in result['citations'])
    print({'correct_evidence_or_abstention':good,'cases':len(cases)});assert good==len(cases)
if __name__=='__main__':main()
