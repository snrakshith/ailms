from fastmcp import FastMCP
mcp=FastMCP('Learning server')
@mcp.tool
def inventory(item: str)->int:
    """Return quantity for a demo product. Read-only."""
    return {'pencil':12}.get(item,0)
@mcp.resource('catalog://summary')
def summary()->str: return 'Demo catalog: pencil'
if __name__=='__main__': mcp.run()  # stdio; start via an MCP client
