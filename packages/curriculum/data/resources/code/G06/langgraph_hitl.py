from typing import TypedDict
from langgraph.graph import StateGraph,START,END
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.types import interrupt,Command
class State(TypedDict):
    proposal:str
    approved:bool
def review(s): return {'approved':interrupt({'proposal':s['proposal']}) is True}
b=StateGraph(State); b.add_node('review',review); b.add_edge(START,'review'); b.add_edge('review',END)
g=b.compile(checkpointer=InMemorySaver()); cfg={'configurable':{'thread_id':'demo'}}
print(g.invoke({'proposal':'draft only','approved':False},cfg))
assert g.invoke(Command(resume=True),cfg)['approved'] is True
# No real writes here; authorize and deduplicate separately before side effects.
