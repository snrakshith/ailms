import asyncio
from fastapi import FastAPI,HTTPException
from fastapi.testclient import TestClient
from fastapi.responses import StreamingResponse
from pydantic import BaseModel,Field,ConfigDict
app=FastAPI()
class Input(BaseModel):
    model_config=ConfigDict(extra='forbid',strict=True)
    text:str=Field(min_length=1,max_length=100)
async def infer(text):
    raise NotImplementedError("Learner TODO: infer")
@app.post('/infer')
async def endpoint(data:Input):
    raise NotImplementedError("Learner TODO: endpoint")
@app.get('/stream')
async def stream():
    raise NotImplementedError("Learner TODO: stream")
def main():
    with TestClient(app) as c:
        assert c.post('/infer',json={'text':'abc'}).json()=={'length':3}
        assert c.post('/infer',json={'text':''}).status_code==422
        assert c.post('/infer',json={'text':'slow'}).status_code==504
        assert c.post('/infer',json={'text':'error'}).status_code==503
        r=c.get('/stream');assert r.headers['content-type'].startswith('text/event-stream') and r.text.endswith('event: done\ndata: {}\n\n')
    print('API validation, timeout, error and SSE framing passed; network cancellation not tested')
if __name__=='__main__':main()
