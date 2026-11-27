from pydantic import BaseModel,ConfigDict,Field,ValidationError
class LookupArgs(BaseModel):
    model_config=ConfigDict(extra='forbid',strict=True)
    sku:str=Field(pattern=r'^SKU[0-9]{3}$')
CATALOG={'SKU001':{'name':'Notebook','price':4},'SKU002':{'name':'Pen','price':2}}
def call_tool(tool,args,scopes):
    raise NotImplementedError("Learner TODO: call_tool")
def main():
    s={'catalog:read'}; assert call_tool('lookup',{'sku':'SKU001'},s)['data']['name']=='Notebook'
    assert call_tool('lookup',{'sku':7},s)['error']=='invalid_arguments'
    assert call_tool('lookup',{'sku':'SKU001'},set())['error']=='denied'
    assert call_tool('delete',{},s)['error']=='unknown_tool'
    assert call_tool('lookup',{'sku':'SKU999'},s)['error']=='not_found';print('5 tool contract checks passed; not an MCP transport test')
if __name__=='__main__':main()
