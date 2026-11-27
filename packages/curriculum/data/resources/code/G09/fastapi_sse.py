import asyncio,json
from fastapi import FastAPI,Request
from fastapi.responses import StreamingResponse
from pydantic import BaseModel,Field
app=FastAPI()
class Input(BaseModel): text:str=Field(min_length=1,max_length=200)
@app.get('/health')
def health(): return {'status':'ok'}
@app.post('/chat')
async def chat(body:Input,request:Request):
    async def events():
        for word in ['Hello','learner']:
            if await request.is_disconnected(): return
            yield 'event: delta\ndata: '+json.dumps({'text':word})+'\n\n'
            await asyncio.sleep(.05)
        yield 'event: done\ndata: {}\n\n'
    return StreamingResponse(events(),media_type='text/event-stream')
# uvicorn fastapi_sse:app --port 8000 (run from this directory)
