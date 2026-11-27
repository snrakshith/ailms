# Illustrative version-sensitive integration; consult the current metric API.
from ragas import SingleTurnSample
sample=SingleTurnSample(user_input='What is annual leave?',response='20 days',retrieved_contexts=['Annual leave is 20 days.'],reference='20 days')
print(sample)
# Configure an evaluator LLM and a faithfulness/context metric before scoring;
# never treat construction of the sample as an evaluation result.
