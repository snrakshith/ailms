def inventory(item): return {'pencil':12}.get(item,0)
def execute(call):
    if set(call)!={'tool','item'} or call['tool']!='inventory' or not isinstance(call['item'],str): raise ValueError('invalid tool call')
    return inventory(call['item'])
def run(decide,max_steps=4):
    observations=[]
    for _ in range(max_steps):
        action=decide(observations)
        if 'final' in action: return action['final']
        observations.append(execute(action))
    return None
assert run(lambda obs:{'final':obs[-1]} if obs else {'tool':'inventory','item':'pencil'})==12
assert run(lambda obs:{'tool':'inventory','item':'pencil'},2) is None
print('bounded agent tests passed')
