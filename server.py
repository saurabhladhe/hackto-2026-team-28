import json
import os
from pathlib import Path

from mcp import types
from fastmcp import FastMCP
from fastmcp.apps import AppConfig
from fastmcp.tools import ToolResult

mcp = FastMCP("hackto-2026")

UI_DIR = Path(__file__).parent / "ui" / "dist"
VIEW_URI = "ui://hackto-2026/app.html"


@mcp.tool(app=AppConfig(resource_uri=VIEW_URI))
def team_directory() -> ToolResult:
    """Browse the team directory."""
    members = [
        {"name": "Alice Chen", "role": "Staff Engineer", "office": "San Francisco"},
        {"name": "Bob Martinez", "role": "Lead Designer", "office": "New York"},
        {"name": "Carol Johnson", "role": "Senior Engineer", "office": "London"},
        {"name": "David Kim", "role": "Product Manager", "office": "San Francisco"},
        {"name": "Eva Mueller", "role": "Engineer", "office": "Berlin"},
    ]
    return ToolResult(
        content=[types.TextContent(type="text", text=json.dumps(members, indent=2))],
        structured_content={"type": "team-directory", "members": members},
    )


@mcp.resource(VIEW_URI)
def app_view() -> str:
    """MCP App UI built with Vite."""
    html_path = UI_DIR / "mcp-app.html"
    if not html_path.exists():
        return "<html><body><p>UI not built. Run: cd ui && npm run build</p></body></html>"
    return html_path.read_text(encoding="utf-8")
