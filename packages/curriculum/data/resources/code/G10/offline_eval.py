def score(case):
    allowed=set(case['retrieved_ids'])
    cited=set(case['cited_ids'])
    return {'citation_precision':len(cited&allowed)/len(cited) if cited else None,'required_tool_ok':case['expected_tool']==case['actual_tool']}
assert score({'retrieved_ids':['A'],'cited_ids':['A','B'],'expected_tool':'search','actual_tool':'search'})=={'citation_precision':.5,'required_tool_ok':True}
print('deterministic evaluation passed')
# Citation membership is not semantic faithfulness; add human-calibrated grading.
