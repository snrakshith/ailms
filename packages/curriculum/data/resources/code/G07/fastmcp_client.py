import asyncio
from pathlib import Path
from fastmcp import Client
async def main():
    async with Client(str(Path(__file__).with_name('fastmcp_server.py'))) as client:
        print(await client.list_tools())
        print(await client.call_tool('inventory',{'item':'pencil'}))
if __name__=='__main__': asyncio.run(main())
