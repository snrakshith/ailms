# Opt-in: configure the provider and vector backend according to Mem0 docs.
from mem0 import Memory
import os
if os.environ.get('ALLOW_EXTERNAL_MEMORY')!='1': raise SystemExit('Set ALLOW_EXTERNAL_MEMORY=1 after reviewing provider and retention settings')
m=Memory()
user='synthetic-course-user'
m.add([{'role':'user','content':'I prefer Python examples.'}],user_id=user)
print(m.search('preferred programming language',user_id=user))
# Delete this synthetic user via the documented API after the lab.
