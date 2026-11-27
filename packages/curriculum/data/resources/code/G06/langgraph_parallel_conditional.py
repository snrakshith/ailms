from typing import Annotated,TypedDict
import operator
from langgraph.graph import StateGraph,START,END
class State(TypedDict):
    query:str
    evidence:Annotated[list[str],operator.add]
def route(s): return 'go' if s['query'].strip() else 'stop'
def left(s): return {'evidence':['keyword']}
def right(s): return {'evidence':['dense']}
def join(s): return {}
b=StateGraph(State)
for name,fn in [('left',left),('right',right),('join',join)]: b.add_node(name,fn)
b.add_conditional_edges(START,lambda s:['left','right'] if route(s)=='go' else [END])
b.add_edge(['left','right'],'join'); b.add_edge('join',END)
g=b.compile(); assert set(g.invoke({'query':'policy','evidence':[]})['evidence'])=={'keyword','dense'}
assert g.invoke({'query':'','evidence':[]})['evidence']==[]
