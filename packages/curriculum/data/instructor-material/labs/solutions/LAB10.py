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
    if text=='slow':await asyncio.sleep(.1)
    if text=='error':raise RuntimeError('internal fixture')
    return {'length':len(text)}
@app.post('/infer')
async def endpoint(data:Input):
    try:return await asyncio.wait_for(infer(data.text),timeout=.02)
    except TimeoutError:raise HTTPException(504,'timeout')
    except RuntimeError:raise HTTPException(503,'unavailable')
@app.get('/stream')
async def stream():
    async def events():
        yield 'event: delta\ndata: {"text":"hi"}\n\n'
        yield 'event: done\ndata: {}\n\n'
    return StreamingResponse(events(),media_type='text/event-stream')
def main():
    with TestClient(app) as c:
        assert c.post('/infer',json={'text':'abc'}).json()=={'length':3}
        assert c.post('/infer',json={'text':''}).status_code==422
        assert c.post('/infer',json={'text':'slow'}).status_code==504
        assert c.post('/infer',json={'text':'error'}).status_code==503
        r=c.get('/stream');assert r.headers['content-type'].startswith('text/event-stream') and r.text.endswith('event: done\ndata: {}\n\n')
    print('API validation, timeout, error and SSE framing passed; network cancellation not tested')
if __name__=='__main__':main()
