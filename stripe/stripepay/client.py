import json
import os
from typing import Any

from fastmcp import Client
from fastmcp.client.transports import StreamableHttpTransport


class StripeMCPClient:
    def __init__(self) -> None:
        self.url = os.environ.get("STRIPE_MCP_URL", "https://mcp.stripe.com")
        key = os.environ.get("STRIPE_SECRET_KEY")
        if not key:
            raise RuntimeError(
                "STRIPE_SECRET_KEY is not set. "
                "Set it in .env or export it before running the server."
            )
        self.key = key

    async def call(self, tool: str, arguments: dict[str, Any]) -> dict[str, Any]:
        transport = StreamableHttpTransport(
            url=self.url,
            headers={"Authorization": f"Bearer {self.key}"},
        )
        async with Client(transport) as client:
            result = await client.call_tool(tool, arguments)
        if result.is_error:
            raise RuntimeError(f"Stripe MCP error for tool '{tool}'")
        text = result.content[0].text if result.content else "{}"
        return json.loads(text)
