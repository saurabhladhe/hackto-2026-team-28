# hackto-2026-team-28 — MCP App Renderer

Build an MCP server that renders interactive UIs (MCP Apps) within Claude/ChatGPT using FastMCP + Prefab.

## `fastmcp/` — reference only

`fastmcp/` is a read-only copy of the upstream [PrefectHQ/fastmcp](https://github.com/PrefectHQ/fastmcp) repo.
**Never edit files inside `fastmcp/`.** Use it to look up the framework API.

| Source | What you'll find |
| ------ | ---------------- |
| `fastmcp/docs/apps/` | Everything about building app UIs (the main reference for this project) |
| `fastmcp/docs/servers/` | Server concepts: tools, resources, prompts, middleware, auth |
| `fastmcp/examples/` | Runnable example servers (especially `examples/apps/`) |
| `fastmcp/README.md` | High-level framework overview |
| `fastmcp/pyproject.toml` | FastMCP's own build config (dep list, tool config) |
| `fastmcp/CLAUDE.md` | FastMCP's development guidelines (symlinked from `fastmcp/AGENTS.md`) |

The upstream docs are also at [gofastmcp.com](https://gofastmcp.com) (with `llms.txt` / `llms-full.txt` for LLM consumption).

## Core patterns

### Interactive tool (simple UIs — charts, tables, dashboards)

```python
from fastmcp import FastMCP

mcp = FastMCP("My App")

@mcp.tool(app=True)
def my_dashboard() -> DataTable:
    """Description the model sees."""
    return DataTable(columns=[...], rows=[...], search=True)
```

### FastMCPApp (UIs that call back to the server — forms, search, CRUD)

```python
from fastmcp import FastMCP, FastMCPApp
from prefab_ui.actions.mcp import CallTool
from prefab_ui.rx import RESULT

app = FastMCPApp("My App")

@app.tool()
def save_item(data: dict) -> list[dict]:
    """Backend tool — not model-visible by default."""
    ...

@app.ui()
def my_app() -> PrefabApp:
    """Entry point — model-visible."""
    with Form(on_submit=CallTool("save_item", on_success=SetState("items", RESULT))):
        ...
    return PrefabApp(view=view, state={"items": [...]})

mcp = FastMCP("Server", providers=[app])
```

### Dev preview

```bash
pip install "fastmcp[apps]"
fastmcp dev apps server.py
# Opens http://localhost:8080 — pick a tool, fill args, see the rendered UI
```

## Key imports

```python
from fastmcp import FastMCP, FastMCPApp
from prefab_ui.app import PrefabApp
from prefab_ui.components import Column, DataTable, DataTableColumn, Grid, ...
from prefab_ui.actions import SetState, ShowToast
from prefab_ui.actions.mcp import CallTool
from prefab_ui.rx import Rx, STATE, RESULT
```

Full component reference at [prefab.prefect.io/docs/components](https://prefab.prefect.io/docs/components).

## Project setup

- Use `uv` for dependency management
- Project lives at repo root (not inside `fastmcp/`)
- Need `pip install "fastmcp[apps]"` for app tools with Prefab UIs
