import json
from pathlib import Path

from mcp import types
from fastmcp import FastMCP
from fastmcp.apps import AppConfig, ResourceCSP
from fastmcp.tools import ToolResult

mcp = FastMCP("hackto-2026")

UI_DIR = Path(__file__).parent / "ui" / "dist"
VIEW_URI = "ui://hackto-2026/app.html"

NIKE_IMG = "https://static.nike.com/a/images"

PRODUCTS = [
    {
        "id": "pegasus-42",
        "name": "Nike Pegasus 42",
        "category": "Men's Road Running Shoes",
        "price": 190,
        "imageUrl": f"{NIKE_IMG}/t_PDP_1728_v1/f_auto,q_auto:eco/c8fe3313-6668-409f-9a7b-b57309986ae9/AIR+ZOOM+PEGASUS+42.png",
        "gallery": [
            f"{NIKE_IMG}/t_PDP_1728_v1/f_auto,q_auto:eco/c8fe3313-6668-409f-9a7b-b57309986ae9/AIR+ZOOM+PEGASUS+42.png",
            f"{NIKE_IMG}/t_PDP_1728_v1/f_auto,q_auto:eco/11552a29-a08e-4019-8501-3eaae4f4a2cf/AIR+ZOOM+PEGASUS+42.png",
            f"{NIKE_IMG}/t_PDP_1728_v1/f_auto,q_auto:eco/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/c8fe3313-6668-409f-9a7b-b57309986ae9/AIR+ZOOM+PEGASUS+42.png",
        ],
        "description": "Feel the power of full-length, curved Air Zoom in the Pegasus 42. Responsive cushioning meets a supportive fit for everyday running.",
        "colors": [
            {"name": "Black/White", "hex": "#111111"},
            {"name": "Blue Lagoon", "hex": "#4B8BBE"},
            {"name": "Platinum Tint", "hex": "#E8E8E8"},
        ],
        "sizes": ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "13"],
        "features": [
            "Full-length curved Air Zoom unit delivers a responsive ride",
            "Engineered mesh upper provides breathability and support",
            "Rubber outsole offers durable traction",
            "Plush foam midsole adds lightweight cushioning",
            "Heel pull tab for easy on and off",
        ],
    },
    {
        "id": "air-max-dn",
        "name": "Nike Air Max Dn",
        "category": "Men's Shoes",
        "price": 190,
        "imageUrl": f"{NIKE_IMG}/t_PDP_1728_v1/f_auto,q_auto:eco/d703fd8e-477e-410a-8b96-dc22a4516162/AIR+MAX+DN8.png",
        "gallery": [
            f"{NIKE_IMG}/t_PDP_1728_v1/f_auto,q_auto:eco/d703fd8e-477e-410a-8b96-dc22a4516162/AIR+MAX+DN8.png",
            f"{NIKE_IMG}/t_PDP_1728_v1/f_auto,q_auto:eco/f5cf9e63-5c8f-4fbc-b1f4-88c28b9e2262/AIR+MAX+DN.png",
            f"{NIKE_IMG}/t_PDP_1728_v1/f_auto,q_auto:eco/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/d703fd8e-477e-410a-8b96-dc22a4516162/AIR+MAX+DN8.png",
        ],
        "description": "The Air Max Dn features Dynamic Air unit technology that creates a sensation of walking on air with every step.",
        "colors": [
            {"name": "Black", "hex": "#000000"},
            {"name": "White", "hex": "#FFFFFF"},
            {"name": "Pure Platinum", "hex": "#D4D4D4"},
        ],
        "sizes": ["7", "8", "9", "10", "10.5", "11", "12", "13"],
        "features": [
            "Dynamic Air unit provides adaptive cushioning",
            "Two-tone tubular design delivers modern style",
            "Mesh upper with synthetic overlays for breathability",
            "Rubber outsole with flex grooves for natural motion",
            "Padded collar for comfort",
        ],
    },
    {
        "id": "air-max-90",
        "name": "Nike Air Max 90",
        "category": "Men's Shoes",
        "price": 160,
        "imageUrl": f"{NIKE_IMG}/t_PDP_1728_v1/f_auto,q_auto:eco/w2ldynwtyuspv6r5rffj/AIR+MAX+90.png",
        "gallery": [
            f"{NIKE_IMG}/t_PDP_1728_v1/f_auto,q_auto:eco/w2ldynwtyuspv6r5rffj/AIR+MAX+90.png",
            f"{NIKE_IMG}/t_PDP_1728_v1/f_auto,q_auto:eco/49c3e628-1b11-444b-b05c-546e94ad6bae/AIR+MAX+90+SE.png",
            f"{NIKE_IMG}/t_PDP_1728_v1/f_auto,q_auto:eco/7b61045e-06d6-4c8e-b5aa-e4499885cd11/NIKE+AIR+MAX+90.png",
        ],
        "description": "The iconic Air Max 90 returns with classic style and visible Air cushioning. Timeless design meets all-day comfort.",
        "colors": [
            {"name": "White/Black", "hex": "#FFFFFF"},
            {"name": "Black/Anthracite", "hex": "#2C2C2C"},
            {"name": "University Red", "hex": "#CC0000"},
        ],
        "sizes": ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12"],
        "features": [
            "Visible Air-Sole unit for lightweight cushioning",
            "Padded low-cut collar for comfort",
            "Rubber outsole with heritage traction pattern",
            "Leather and mesh upper for durability",
            "Iconic colour blocking",
        ],
    },
    {
        "id": "air-max-95",
        "name": "Nike Air Max 95 Big Bubble",
        "category": "Men's Shoes",
        "price": 210,
        "imageUrl": f"{NIKE_IMG}/t_PDP_1728_v1/f_auto,q_auto:eco/1ffab5b3-3ca4-4420-a689-649905c6c80f/NIKE+AIR+MAX+95+BIG+BUBBLE.png",
        "gallery": [
            f"{NIKE_IMG}/t_PDP_1728_v1/f_auto,q_auto:eco/1ffab5b3-3ca4-4420-a689-649905c6c80f/NIKE+AIR+MAX+95+BIG+BUBBLE.png",
            f"{NIKE_IMG}/t_PDP_1728_v1/f_auto,q_auto:eco/8949cd2b-afca-4839-8eb6-e685d9afef85/AIR+MAX+95+G+NRG+P26.png",
            f"{NIKE_IMG}/t_PDP_1728_v1/f_auto,q_auto:eco/3e1914b2-3bde-479a-9fc7-74976295f452/NIKE+AIR+MAX+95+BIG+BUBBLE.png",
        ],
        "description": "The unmistakable 90s icon returns with an even bigger Air unit. The Air Max 95 Big Bubble reissues the original with maximum impact.",
        "colors": [
            {"name": "Black/Hot Red", "hex": "#1A1A1A"},
            {"name": "White/Neon", "hex": "#FFFFFF"},
            {"name": "Anthracite", "hex": "#3D3D3D"},
        ],
        "sizes": ["7", "8", "9", "9.5", "10", "10.5", "11", "12", "13"],
        "features": [
            "Oversized visible Air unit in the heel",
            "Ripped mesh and leather upper layers",
            "Neon accents for a retro 90s look",
            "Waffle outsole pattern for traction",
            "Original lacing system",
        ],
    },
    {
        "id": "jordan-1-low",
        "name": "Air Jordan 1 Retro Low OG",
        "category": "Men's Shoes",
        "price": 180,
        "imageUrl": f"{NIKE_IMG}/t_PDP_1728_v1/f_auto,q_auto:eco/ba9c1273-c857-431c-8ec7-f97aa861ed69/AIR+JORDAN+1+RETRO+LOW+OG.png",
        "gallery": [
            f"{NIKE_IMG}/t_PDP_1728_v1/f_auto,q_auto:eco/ba9c1273-c857-431c-8ec7-f97aa861ed69/AIR+JORDAN+1+RETRO+LOW+OG.png",
            f"{NIKE_IMG}/t_PDP_1728_v1/f_auto,q_auto:eco/a4973a5c-6a81-46cf-a27e-be4c5fa29793/AIR+JORDAN+1+RETRO+LOW+OG.png",
            f"{NIKE_IMG}/t_PDP_1728_v1/f_auto,q_auto:eco/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ba9c1273-c857-431c-8ec7-f97aa861ed69/AIR+JORDAN+1+RETRO+LOW+OG.png",
        ],
        "description": "The Air Jordan 1 Retro Low OG brings back the iconic silhouette with premium materials and OG details that honour the original.",
        "colors": [
            {"name": "Black/White", "hex": "#111111"},
            {"name": "University Blue", "hex": "#4B6E9E"},
            {"name": "Triple White", "hex": "#F5F5F5"},
        ],
        "sizes": ["7", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12", "13"],
        "features": [
            "Stitched leather and synthetic upper",
            "Air-Sole unit for lightweight cushioning",
            "Rubber outsole with heritage pivot circle",
            "Wings logo on heel",
            "Low-cut collar for comfort",
        ],
    },
    {
        "id": "jordan-4",
        "name": "Air Jordan 4 Retro",
        "category": "Men's Shoes",
        "price": 250,
        "imageUrl": f"{NIKE_IMG}/t_PDP_1728_v1/f_auto,q_auto:eco/4fde2cc9-99ff-469a-81b3-e74ffe5be20f/AIR+JORDAN+4+RETRO.png",
        "gallery": [
            f"{NIKE_IMG}/t_PDP_1728_v1/f_auto,q_auto:eco/4fde2cc9-99ff-469a-81b3-e74ffe5be20f/AIR+JORDAN+4+RETRO.png",
            f"{NIKE_IMG}/t_PDP_1728_v1/f_auto,q_auto:eco/6e60a84d-fcc2-4aad-a6b1-5a8c72b1c460/AIR+JORDAN+4+RETRO.png",
            f"{NIKE_IMG}/t_PDP_1728_v1/f_auto,q_auto:eco/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/4fde2cc9-99ff-469a-81b3-e74ffe5be20f/AIR+JORDAN+4+RETRO.png",
        ],
        "description": "The Air Jordan 4 Retro is the legendary silhouette designed by Tinker Hatfield. Premium materials and unmistakable style define this icon.",
        "colors": [
            {"name": "Black/Cement", "hex": "#222222"},
            {"name": "White/Red", "hex": "#F5F5F5"},
            {"name": "Military Black", "hex": "#D4D4D4"},
        ],
        "sizes": ["7", "8", "9", "9.5", "10", "10.5", "11", "12", "13", "14"],
        "features": [
            "Premium leather upper with mesh panels",
            "Visible Air-Sole unit in the heel",
            "Plastic wing eyelets for lockdown lacing",
            "Rubber outsole with herringbone traction",
            "Jumpman logo on tongue and heel",
        ],
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
    app=AppConfig(csp=ResourceCSP(resource_domains=["https://static.nike.com", "https://fonts.googleapis.com", "https://fonts.gstatic.com"])),
)
def app_view() -> str:
    """MCP App UI built with Vite."""
    html_path = UI_DIR / "mcp-app.html"
    if not html_path.exists():
        return "<html><body><p>UI not built. Run: cd ui && npm run build</p></body></html>"
    return html_path.read_text(encoding="utf-8")
