## Development

```bash
# Install deps
uv sync
cd ui && npm install

# Build the UI app
cd ui && npm run build
# → produces ui/dist/mcp-app.html

# Preview with FastMCP dev server
fastmcp dev apps server.py
# Opens http://localhost:8080
```

## Using in Claude Desktop

Add this entry to your `claude_desktop_config.json` (located at `~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "hackto-2026": {
      "command": "uv",
      "args": [
        "run",
        "--directory",
        "/absolute/path/to/hackto-2026-team-28",
        "fastmcp",
        "run",
        "server.py"
      ]
    }
  }
}
```

**Always build the UI before starting the server**: `cd ui && npm run build`

Restart Claude Desktop to pick up the change. The `team_directory` tool will appear in the tool list.
