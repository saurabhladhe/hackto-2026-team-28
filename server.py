from fastmcp import FastMCP
from prefab_ui.app import PrefabApp
from prefab_ui.components import Column, DataTable, DataTableColumn, Heading

mcp = FastMCP("hackto-2026")

@mcp.tool(app=True)
def team_directory() -> PrefabApp:
    """Browse the team directory."""
    members = [
        {"name": "Alice Chen", "role": "Staff Engineer", "office": "San Francisco"},
        {"name": "Bob Martinez", "role": "Lead Designer", "office": "New York"},
        {"name": "Carol Johnson", "role": "Senior Engineer", "office": "London"},
    ]
    with PrefabApp() as app:
        with Column(gap=4, css_class="p-6"):
            Heading("Team Directory")
            DataTable(
                columns=[
                    DataTableColumn(key="name", header="Name", sortable=True),
                    DataTableColumn(key="role", header="Role", sortable=True),
                    DataTableColumn(key="office", header="Office", sortable=True),
                ],
                rows=members,
                search=True,
            )
    return app
