import json
import os

from fastmcp import FastMCP
from fastmcp.apps import AppConfig
from fastmcp.tools import ToolResult
from mcp import types

from .catalog import find_product
from .client import StripeMCPClient

VIEW_URI = "ui://hackto-2026/app.html"


def register(mcp: FastMCP) -> None:

    @mcp.tool(app=AppConfig(resource_uri=VIEW_URI))
    async def start_checkout(items: list) -> ToolResult:
        """Create a Stripe Checkout Payment Link for one or more Nike SKUs."""
        stripe = StripeMCPClient()
        stripe_line_items = []
        checkout_items = []

        for item in items:
            product_id = item["product_id"]
            size = item["size"]
            quantity = item.get("quantity", 1)

            product = find_product(product_id)
            if product is None:
                raise ValueError(f"unknown product: {product_id}")

            stripe_product = await stripe.call("create_product", {
                "name": f"{product['name']} — size {size}",
                "description": product["description"],
            })
            stripe_price = await stripe.call("create_price", {
                "product": stripe_product["id"],
                "currency": "usd",
                "unit_amount": product["price"] * 100,
            })
            stripe_line_items.append({"price": stripe_price["id"], "quantity": quantity})
            checkout_items.append({
                "product": product,
                "size": size,
                "quantity": quantity,
            })

        success_url = os.environ.get("STRIPE_SUCCESS_URL", "https://example.com/success")
        link = await stripe.call("stripe_api_execute", {
            "stripe_api_operation_id": "PostPaymentLinks",
            "parameters": {
                "line_items": stripe_line_items,
                "after_completion": {
                    "type": "redirect",
                    "redirect": {"url": success_url},
                },
            },
        })

        payload = {
            "type": "nike-checkout",
            "items": checkout_items,
            "checkoutUrl": link["url"],
            "stripePaymentLinkId": link["id"],
        }
        return ToolResult(
            content=[types.TextContent(type="text", text=json.dumps(payload))],
            structured_content=payload,
        )
