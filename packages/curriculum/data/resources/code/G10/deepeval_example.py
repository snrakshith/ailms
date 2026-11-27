import os
from deepeval.test_case import LLMTestCase
from deepeval.metrics import GEval
from deepeval.test_case import LLMTestCaseParams
# Configure the judge provider credentials separately. This may incur cost.
case=LLMTestCase(input='What is the leave policy?',actual_output='20 days',expected_output='20 days')
metric=GEval(name='Correctness',criteria='Check factual agreement with expected output.',evaluation_params=[LLMTestCaseParams.ACTUAL_OUTPUT,LLMTestCaseParams.EXPECTED_OUTPUT],model=os.environ['JUDGE_MODEL'],threshold=.8)
metric.measure(case); print(metric.score,metric.reason)
