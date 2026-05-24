def find_product(product_id: str) -> dict | None:
    from server import PRODUCTS

    return next((p for p in PRODUCTS if p["id"] == product_id), None)
