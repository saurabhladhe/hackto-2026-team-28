# Stripe MCP Integration

This folder is the **payments layer** of the `hackto-2026-team-28` MCP App.
It plugs Stripe-powered checkout into the existing FastMCP server (`server.py`)
and the Vite/React UI (`ui/`) so that a host like Claude Desktop can drive a
full **discover → render → pay** flow from a single user prompt.

> Example prompt the integration supports:
>
> *"Go to Nike and buy the white Air Force 1, men's size 10."*
>
> 1. Claude calls our `nike_catalog` / `nike_product_detail` tool — the UI renders
>    Nike product specs inside the Claude iframe.
> 2. Claude calls our `start_checkout` tool — we ask the **Stripe MCP server** to
>    create a Stripe `Product`, `Price`, and `PaymentLink` for that SKU.
> 3. The UI swaps to a checkout pane with the Stripe-hosted payment URL; the
>    user pays in Stripe; we surface the receipt back to the agent.

---

## 1. Architecture

```
┌─────────────────────────── Claude Desktop / ChatGPT ────────────────────────────┐
│                                                                                  │
│   user prompt ──▶ LLM agent ──▶ tools ──▶ MCP host                               │
│                       │                                                          │
│                       ├──── our MCP server (server.py) ─── tools + ui:// resource│
│                       │        nike_catalog                                      │
│                       │        nike_product_detail                               │
│                       │        start_checkout    ◀── delegates payment work ──┐  │
│                       │                                                       │  │
│                       └──── Stripe MCP server (https://mcp.stripe.com) ◀──────┘  │
│                                create_product / create_price / create_payment_link│
│                                list_payment_intents / search_stripe_resources    │
└──────────────────────────────────────────────────────────────────────────────────┘
                       │
                       ▼
        ┌──────────────────────────────────┐
        │ ui/dist/mcp-app.html (iframe)    │
        │   • Catalog grid                 │
        │   • Product detail + size picker │
        │   • Checkout pane (Stripe URL)   │
        └──────────────────────────────────┘
```

Key points:

- The agent **does not** call Stripe APIs directly from the UI. Our FastMCP
  tools are the only thing that touches secrets. The Stripe MCP server is
  invoked **agent-to-agent**, not from the browser.
- Our UI iframe only ever receives a *public* Stripe payment URL (or
  PaymentIntent client secret if you choose Stripe Elements later).
- All tools that render UI use the existing `ui://hackto-2026/app.html`
  resource and dispatch on `structured_content.type` (e.g. `nike-catalog`,
  `nike-product-detail`, `nike-checkout`).

---

## 2. Folder layout

```
stripe/
├── readme.md             # this file
└── stripepay/            # implementation lives here
    ├── __init__.py       # re-exports register(mcp) helper
    ├── client.py         # thin Stripe MCP client (httpx + JSON-RPC)
    ├── tools.py          # FastMCP @mcp.tool() definitions
    ├── catalog.py        # in-memory SKU → Stripe product/price cache
    └── schemas.py        # pydantic models for tool inputs/outputs
```

`stripepay/` is the only Python package this folder ships. Everything else
(infra, docs) lives next to it.

---

## 3. Prerequisites

| Requirement              | Why                                                  |
| ------------------------ | ---------------------------------------------------- |
| Python ≥ 3.10            | matches root `pyproject.toml`                        |
| `fastmcp[apps]` ≥ 3      | already a project dep                                |
| `httpx` ≥ 0.27           | call the remote Stripe MCP server                    |
| `pydantic` ≥ 2           | structured tool args                                 |
| `stripe` (Python SDK)    | optional — only if you bypass MCP for webhooks       |
| Stripe account + sandbox | get a **restricted** API key, not the live secret    |
| Node ≥ 20 / npm          | rebuilding the UI                                    |

Install Python deps from the repo root:

```bash
uv add httpx pydantic
uv add --optional stripe stripe   # optional, for webhook verification only
uv sync
```

---

## 4. Configure the Stripe MCP server

We use the **remote** Stripe MCP server (`https://mcp.stripe.com`) so we don't
have to host our own. Two flavors of credentials:

### 4a. Interactive use in Claude Desktop (OAuth)

Add Stripe alongside our server in `~/Library/Application Support/Claude/claude_desktop_config.json`:

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
    },
    "stripe": {
      "url": "https://mcp.stripe.com"
    }
  }
}
```

Restart Claude Desktop. The first time you invoke a Stripe tool, Claude opens
an OAuth consent screen — approve it with your sandbox account.

> Manage authorized sessions at
> [dashboard.stripe.com/settings/user](https://dashboard.stripe.com/settings/user)
> under **OAuth sessions**.

### 4b. Headless / agentic use (Bearer token)

When `start_checkout` calls Stripe MCP **from inside our server** there is no
human to OAuth, so we authenticate with a **Restricted API Key**:

1. Stripe Dashboard → Developers → API keys → **Create restricted key**.
2. Grant only the permissions we need:
   - `Products`: write
   - `Prices`: write
   - `Payment Links`: write
   - `PaymentIntents`: read
   - `Customers`: write *(optional)*
3. Copy the `rk_test_…` value into a local `.env` file (already gitignored):

```bash
# .env (repo root — never commit)
STRIPE_SECRET_KEY=rk_test_xxx
STRIPE_MCP_URL=https://mcp.stripe.com
STRIPE_SUCCESS_URL=https://example.com/success
STRIPE_CANCEL_URL=https://example.com/cancel
```

`stripepay/client.py` reads these from the environment.

---

## 5. Install Stripe Agent Skills (recommended)

[Stripe agent skills](https://agentskills.io/home) give the LLM canonical
patterns for using each Stripe MCP tool. Install them once into this repo so
any agent loading the project gets best-practice guidance:

```bash
# from repo root
npx skills add https://docs.stripe.com --yes
```

For Cursor users, also install the
[Stripe plugin](https://cursor.com/marketplace/stripe) from the marketplace.

---

## 6. Implement `stripepay/`

### 6a. `client.py` — call Stripe MCP over HTTP+JSON-RPC

```python
import os, httpx
from typing import Any

class StripeMCPClient:
    def __init__(self) -> None:
        self.url = os.environ.get("STRIPE_MCP_URL", "https://mcp.stripe.com")
        self.key = os.environ["STRIPE_SECRET_KEY"]
        self._id = 0

    async def call(self, tool: str, arguments: dict[str, Any]) -> dict[str, Any]:
        self._id += 1
        payload = {
            "jsonrpc": "2.0",
            "id": self._id,
            "method": "tools/call",
            "params": {"name": tool, "arguments": arguments},
        }
        async with httpx.AsyncClient(timeout=30) as http:
            r = await http.post(
                self.url,
                json=payload,
                headers={
                    "Authorization": f"Bearer {self.key}",
                    "Content-Type": "application/json",
                },
            )
            r.raise_for_status()
            data = r.json()
        if "error" in data:
            raise RuntimeError(f"Stripe MCP error: {data['error']}")
        return data["result"]
```

### 6b. `tools.py` — expose checkout tools to FastMCP

Add a `register(mcp)` helper so `server.py` stays thin:

```python
from fastmcp import FastMCP
from fastmcp.apps import AppConfig
from fastmcp.tools import ToolResult
from mcp import types
import json, os
from .client import StripeMCPClient
from .catalog import find_product

VIEW_URI = "ui://hackto-2026/app.html"

def register(mcp: FastMCP) -> None:
    stripe = StripeMCPClient()

    @mcp.tool(app=AppConfig(resource_uri=VIEW_URI))
    async def start_checkout(product_id: str, size: str, quantity: int = 1) -> ToolResult:
        """Create a Stripe Checkout Payment Link for a Nike SKU and render it in the UI."""
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
        link = await stripe.call("create_payment_link", {
            "line_items": [{"price": stripe_price["id"], "quantity": quantity}],
            "after_completion": {
                "type": "redirect",
                "redirect": {"url": os.environ["STRIPE_SUCCESS_URL"]},
            },
        })

        payload = {
            "type": "nike-checkout",
            "product": product,
            "size": size,
            "quantity": quantity,
            "checkoutUrl": link["url"],
            "stripePaymentLinkId": link["id"],
        }
        return ToolResult(
            content=[types.TextContent(type="text", text=json.dumps(payload))],
            structured_content=payload,
        )

    @mcp.tool(app=AppConfig(resource_uri=VIEW_URI))
    async def order_status(payment_link_id: str) -> ToolResult:
        """Look up a recent PaymentIntent for a payment link to confirm payment."""
        result = await stripe.call("list_payment_intents", {"limit": 5})
        return ToolResult(
            content=[types.TextContent(type="text", text=json.dumps(result))],
            structured_content={"type": "nike-order-status", **result},
        )
```

### 6c. `catalog.py` — bridge in-memory SKUs to Stripe

For the demo we keep the SKU list authoritative in Python. In production you'd
call `list_products` on Stripe MCP and cache by SKU metadata.

```python
from server import PRODUCTS  # reuse the existing demo data

def find_product(product_id: str) -> dict | None:
    return next((p for p in PRODUCTS if p["id"] == product_id), None)
```

### 6d. Wire it into `server.py`

Add **two lines** at the bottom of the existing `server.py`:

```python
from stripe.stripepay import register as register_stripe
register_stripe(mcp)
```

That's the whole server-side surface. No changes to the existing
`nike_catalog` tool or `app_view` resource.

---

## 7. UI changes (`ui/src/`)

The UI dispatches on `structured_content.type`. Add three new types and a
checkout component:

1. Extend `ui/src/types.ts`:

   ```ts
   export interface NikeProductDetailData {
     type: "nike-product-detail";
     product: Product;
     sizes: number[];
   }

   export interface NikeCheckoutData {
     type: "nike-checkout";
     product: Product;
     size: string;
     quantity: number;
     checkoutUrl: string;
     stripePaymentLinkId: string;
   }

   export type AppData = NikeCatalogData | NikeProductDetailData | NikeCheckoutData;
   ```

2. In `ui/src/App.tsx`, switch on `data.type` and render either the existing
   catalog grid, a product-detail page (with a size picker that triggers
   `start_checkout` via `mcpApp.callTool`), or a checkout pane that opens
   `data.checkoutUrl` in a new tab and shows order summary while polling
   `order_status`.

3. Rebuild:

   ```bash
   cd ui && npm run build
   ```

> The MCP App SDK iframe is sandboxed, so the actual Stripe Checkout page
> opens in a **new top-level browser tab** (not inside the iframe). After
> payment, the success URL configured in step 4b is shown by Stripe.

---

## 8. CSP — allow the Stripe-hosted checkout

Update the `@mcp.resource` decoration in `server.py` so the iframe can link
out to `checkout.stripe.com` and load Stripe's redirect:

```python
@mcp.resource(
    VIEW_URI,
    app=AppConfig(csp=ResourceCSP(
        resource_domains=[
            "https://static.nike.com",
            "https://checkout.stripe.com",
            "https://js.stripe.com",
        ],
    )),
)
def app_view() -> str: ...
```

---

## 9. End-to-end test (sandbox)

1. Set env vars (`STRIPE_SECRET_KEY=rk_test_…` etc.).
2. Build the UI: `cd ui && npm run build`.
3. Boot dev preview: `fastmcp dev apps server.py` — visit `http://localhost:8080`.
4. In the tool picker, run `nike_catalog` → confirm grid renders.
5. Run `start_checkout` with `product_id=air-force-1`, `size=10` → confirm
   the UI shows a checkout pane with a `https://buy.stripe.com/…` URL.
6. Open that URL, pay with the **`4242 4242 4242 4242`** test card, any
   future expiry, any CVC.
7. Run `order_status` with the returned `stripePaymentLinkId` → confirm a
   `succeeded` PaymentIntent appears.

In Claude Desktop, the same prompt works end to end:

> "Find me white Nike Air Force 1s in size 10 and buy them."

Claude will call `nike_catalog`, then `nike_product_detail`, then
`start_checkout`. The UI updates inline; you finish payment in the popped-out
Stripe tab.

---

## 10. Security checklist

- [ ] **Use restricted keys.** Never put `sk_live_…` in this repo.
- [ ] Keep `.env` in `.gitignore` (already is).
- [ ] Treat all tool args as untrusted — validate `product_id`, `size`,
      `quantity` server-side.
- [ ] Require **human confirmation** in the host for any tool that moves
      money. Claude Desktop and ChatGPT prompt for this by default; don't
      disable it.
- [ ] When composing with other MCP servers, watch for prompt-injection:
      reject suspicious `description` fields before forwarding to Stripe.
- [ ] For production, swap Payment Links for a **Checkout Session** with
      `payment_intent_data.metadata` containing your own order id, and verify
      payment via Stripe **webhooks** (signed with `whsec_…`) — don't trust
      the agent to self-report success.

---

## 11. References

- [Build on Stripe with AI](https://docs.stripe.com/building-with-ai.md)
- [Stripe MCP server](https://docs.stripe.com/mcp.md)
- [Stripe agents guide](https://docs.stripe.com/agents.md)
- [Stripe agent skills catalog](https://docs.stripe.com/.well-known/skills/index.json.md)
- [MCP Apps spec](https://github.com/modelcontextprotocol/ext-apps)
- [FastMCP custom HTML apps](../fastmcp/docs/apps/low-level.mdx) *(in this repo)*
