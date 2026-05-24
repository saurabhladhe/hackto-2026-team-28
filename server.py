from fastmcp import FastMCP

mcp = FastMCP("hackto-2026")

@mcp.tool(app=True)
def hello() -> str:
    """Say hello."""
    return "Hello from hackto-2026-team-28!"
