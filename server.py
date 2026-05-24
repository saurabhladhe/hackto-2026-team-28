import json
from pathlib import Path

from mcp import types
from fastmcp import FastMCP
from fastmcp.apps import AppConfig, ResourceCSP
from fastmcp.tools import ToolResult

mcp = FastMCP("hackto-2026")

UI_DIR = Path(__file__).parent / "ui" / "dist"
VIEW_URI = "ui://hackto-2026/app.html"

PRODUCTS = [
    {
        "id": "air-max-270",
        "name": "Nike Air Max 270",
        "category": "Shoes",
        "price": 150,
        "imageUrl": "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a16-9b8a-f7f9b3b6f1d6/cb5e6f0e-3e5b-4b2a-8fcb-0f8e5c7a9d0e/air-max-270-shoes.png",
        "description": "The Nike Air Max 270 delivers big comfort with a large Air unit at the heel.",
    },
    {
        "id": "air-force-1",
        "name": "Nike Air Force 1 '07",
        "category": "Shoes",
        "price": 110,
        "imageUrl": "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a16-9b8a-f7f9b3b6f1d6/3e4b5c6d-7e8f-4a9b-0c1d-2e3f4a5b6c7d/air-force-1-07-shoes.png",
        "description": "The radiance lives on in the Nike Air Force 1 '07, the iconic basketball shoe.",
    },
    {
        "id": "dri-fit-tee",
        "name": "Nike Dri-FIT Legend",
        "category": "Tops",
        "price": 35,
        "imageUrl": "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a16-9b8a-f7f9b3b6f1d6/5e6f7a8b-9c0d-4e1f-2a3b-4c5d6e7f8a9b/dri-fit-legend-tee.png",
        "description": "The Nike Dri-FIT Legend tee is made with sweat-wicking fabric.",
    },
    {
        "id": "pegasus-41",
        "name": "Nike Pegasus 41",
        "category": "Running",
        "price": 130,
        "imageUrl": "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a16-9b8a-f7f9b3b6f1d6/7a8b9c0d-1e2f-4a3b-5c6d-7e8f9a0b1c2d/pegasus-41-shoes.png",
        "description": "Responsive cushioning and a supportive fit for everyday runs.",
    },
    {
        "id": "sportswear-tech-fleece",
        "name": "Nike Sportswear Tech Fleece",
        "category": "Hoodies",
        "price": 110,
        "imageUrl": "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a16-9b8a-f7f9b3b6f1d6/8b9c0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e/sportswear-tech-fleece-hoodie.png",
        "description": "The Nike Tech Fleece hoodie delivers warmth without the bulk.",
    },
    {
        "id": "metcon-9",
        "name": "Nike Metcon 9",
        "category": "Training",
        "price": 140,
        "imageUrl": "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a16-9b8a-f7f9b3b6f1d6/9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f/metcon-9-shoes.png",
        "description": "The Nike Metcon 9 is built for your toughest workouts.",
    },
]


@mcp.tool(app=AppConfig(resource_uri=VIEW_URI))
def nike_catalog() -> ToolResult:
    """Browse Nike products."""
    return ToolResult(
        content=[types.TextContent(type="text", text=json.dumps(PRODUCTS, indent=2))],
        structured_content={"type": "nike-catalog", "products": PRODUCTS},
    )


@mcp.resource(
    VIEW_URI,
    app=AppConfig(csp=ResourceCSP(resource_domains=["https://static.nike.com"])),
)
def app_view() -> str:
    """MCP App UI built with Vite."""
    html_path = UI_DIR / "mcp-app.html"
    if not html_path.exists():
        return "<html><body><p>UI not built. Run: cd ui && npm run build</p></body></html>"
    return html_path.read_text(encoding="utf-8")
