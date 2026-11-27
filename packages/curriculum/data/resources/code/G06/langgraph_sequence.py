from typing import TypedDict
from langgraph.graph import StateGraph,START,END
class State(TypedDict):
    text:str
    result:str
def normalize(s:State): return {'text':s['text'].strip().lower()}
def finish(s:State): return {'result':s['text'].upper()}
b=StateGraph(State); b.add_node('normalize',normalize); b.add_node('finish',finish)
b.add_edge(START,'normalize'); b.add_edge('normalize','finish'); b.add_edge('finish',END)
graph=b.compile(); result=graph.invoke({'text':' Hello ','result':''})
assert result['result']=='HELLO'; print(result)
