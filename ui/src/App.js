import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo, useCallback } from "react";
const navItems = ["New Releases", "Men", "Women", "Kids", "Jordan", "Sale"];
const categoryGrid = [
    { title: "Running", img: "https://static.nike.com/a/images/w_144,c_limit/1646730d-96cb-4186-a6a5-9959a77c8749/image.png" },
    { title: "Jordan", img: "https://static.nike.com/a/images/w_144,c_limit/6766dc89-8127-4d60-abe3-0086088f001f/image.png" },
    { title: "Basketball", img: "https://static.nike.com/a/images/w_144,c_limit/77b9afd9-3266-4a81-bf0a-5ac2197ca9e5/image.png" },
    { title: "Tennis", img: "https://static.nike.com/a/images/w_144,c_limit/983de953-a677-4fe6-bbca-0edc4c5e0e21/image.png" },
    { title: "Soccer", img: "https://static.nike.com/a/images/w_144,c_limit/9b3a504b-ff4c-441f-8366-b0c3f76f53a3/image.png" },
    { title: "Training", img: "https://static.nike.com/a/images/w_144,c_limit/cc519c1f-fb07-4e52-b58a-fd94c8c9e560/image.png" },
];
const responsiveCSS = `
@media (max-width: 1024px) {
  .nike-util { padding-left: 24px !important; padding-right: 24px !important; }
  .nike-nav-inner { padding-left: 24px !important; padding-right: 24px !important; }
  .nike-section { padding-left: 24px !important; padding-right: 24px !important; }
  .nike-detail { padding: 24px !important; flex-direction: column !important; align-items: center !important; }
  .nike-detail-gallery { max-width: 100% !important; width: 100% !important; }
  .nike-detail-info { max-width: 100% !important; width: 100% !important; }
  .nike-cart-inner { flex-direction: column !important; }
  .nike-cart-layout { flex-direction: column !important; }
  .nike-cart-items { flex: none !important; width: 100% !important; }
  .nike-cart-summary { flex: none !important; max-width: 100% !important; width: 100% !important; }
  .nike-footer-inner { padding-left: 24px !important; padding-right: 24px !important; }
}
@media (max-width: 768px) {
  .nike-util { display: none !important; }
  .nike-desktop-nav { display: none !important; }
  .nike-mobile-nav-btn { display: flex !important; }
  .nike-nav-inner { padding-left: 16px !important; padding-right: 16px !important; height: 56px !important; }
  .nike-section { padding-left: 16px !important; padding-right: 16px !important; }
  .nike-cat-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 8px !important; }
  .nike-prod-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
  .nike-prod-img { aspect-ratio: 1 !important; }
  .nike-hero { height: 400px !important; }
  .nike-hero-title { font-size: 32px !important; }
  .nike-hero-text { left: 24px !important; bottom: 48px !important; max-width: 300px !important; }
  .nike-detail { padding: 16px !important; gap: 24px !important; }
  .nike-detail-gallery { max-width: 100% !important; }
  .nike-detail-info { max-width: 100% !important; }
  .nike-detail-info h1 { font-size: 22px !important; }
  .nike-size-grid { grid-template-columns: repeat(3, 1fr) !important; }
  .nike-cart-inner { padding: 16px !important; }
  .nike-cart-item { flex-direction: row !important; gap: 12px !important; }
  .nike-cart-item-img { width: 80px !important; height: 80px !important; }
  .nike-footer-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
  .nike-footer-inner { padding-left: 16px !important; padding-right: 16px !important; }
  .nike-footer-bottom { flex-direction: column !important; gap: 8px !important; }
  .nike-thumb-grid { flex-wrap: wrap !important; }
}
@media (max-width: 480px) {
  .nike-cat-grid { grid-template-columns: repeat(2, 1fr) !important; }
  .nike-prod-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 8px !important; }
  .nike-section { padding-left: 12px !important; padding-right: 12px !important; }
  .nike-hero { height: 300px !important; }
  .nike-hero-title { font-size: 24px !important; }
  .nike-hero-text { left: 16px !important; bottom: 32px !important; max-width: 250px !important; }
  .nike-detail { padding: 12px !important; }
  .nike-footer-grid { grid-template-columns: 1fr 1fr !important; }
}
`;
/* ---------- Top Nav ---------- */
function TopNav({ cartCount, onCartClick }) {
    const [menuOpen, setMenuOpen] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "nike-util", style: { background: "#f5f5f5", borderBottom: "1px solid #e5e5e5", fontSize: "11px" }, children: _jsxs("div", { style: { maxWidth: "1440px", margin: "0 auto", display: "flex", justifyContent: "flex-end", gap: "24px", padding: "6px 48px", fontWeight: 500 }, children: [_jsx("a", { href: "#", style: { color: "#111", textDecoration: "none" }, children: "Find a Store" }), _jsx("span", { style: { color: "#ccc" }, children: "|" }), _jsx("a", { href: "#", style: { color: "#111", textDecoration: "none" }, children: "Help" }), _jsx("span", { style: { color: "#ccc" }, children: "|" }), _jsx("a", { href: "#", style: { color: "#111", textDecoration: "none" }, children: "Join Us" }), _jsx("span", { style: { color: "#ccc" }, children: "|" }), _jsx("a", { href: "#", style: { color: "#111", textDecoration: "none" }, children: "Sign In" })] }) }), _jsxs("div", { style: { borderBottom: "1px solid #e5e5e5" }, children: [_jsxs("div", { className: "nike-nav-inner", style: { maxWidth: "1440px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", height: "64px" }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [_jsx("button", { onClick: () => setMenuOpen(!menuOpen), className: "nike-mobile-nav-btn", style: { display: "none", background: "none", border: "none", cursor: "pointer", padding: "4px" }, children: _jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "#111", strokeWidth: "2", children: menuOpen ? _jsx("path", { d: "M18 6L6 18M6 6l12 12" }) : _jsxs(_Fragment, { children: [_jsx("path", { d: "M3 6h18" }), _jsx("path", { d: "M3 12h18" }), _jsx("path", { d: "M3 18h18" })] }) }) }), _jsx("span", { style: { fontSize: "22px", fontWeight: 800, letterSpacing: "-0.5px", color: "#111", cursor: "pointer" }, children: "NIKE" })] }), _jsx("div", { className: "nike-desktop-nav", style: { display: "flex", gap: "24px", alignItems: "center" }, children: navItems.map((item) => (_jsx("a", { href: "#", style: { color: "#111", textDecoration: "none", fontSize: "16px", fontWeight: 500, letterSpacing: "0.3px", padding: "20px 0" }, children: item }, item))) }), _jsxs("div", { style: { display: "flex", alignItems: "center", gap: "16px" }, children: [_jsxs("div", { className: "nike-desktop-nav", style: { position: "relative" }, children: [_jsx("input", { type: "text", placeholder: "Search", style: { background: "#f5f5f5", border: "none", borderRadius: "20px", padding: "8px 16px 8px 40px", fontSize: "14px", width: "180px", outline: "none" } }), _jsxs("svg", { style: { position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }, width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#111", strokeWidth: "2", children: [_jsx("circle", { cx: "11", cy: "11", r: "8" }), _jsx("path", { d: "M21 21l-4.35-4.35" })] })] }), _jsxs("button", { onClick: onCartClick, style: { background: "none", border: "none", cursor: "pointer", position: "relative", padding: "4px" }, children: [_jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "#111", strokeWidth: "1.5", children: [_jsx("path", { d: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" }), _jsx("path", { d: "M3 6h18" }), _jsx("path", { d: "M16 10a4 4 0 01-8 0" })] }), cartCount > 0 && (_jsx("span", { style: { position: "absolute", top: "-4px", right: "-6px", background: "#111", color: "#fff", borderRadius: "50%", width: "18px", height: "18px", fontSize: "11px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }, children: cartCount }))] })] })] }), menuOpen && (_jsx("div", { style: { background: "#fff", borderBottom: "1px solid #e5e5e5", padding: "12px 16px" }, children: navItems.map((item) => (_jsx("a", { href: "#", style: { display: "block", padding: "12px 0", color: "#111", textDecoration: "none", fontSize: "16px", fontWeight: 500, borderBottom: "1px solid #f5f5f5" }, children: item }, item))) }))] })] }));
}
/* ---------- Footer ---------- */
function Footer() {
    return (_jsx("div", { style: { background: "#111", color: "#fff" }, children: _jsxs("div", { className: "nike-footer-inner", style: { maxWidth: "1440px", margin: "0 auto", padding: "48px 48px 24px" }, children: [_jsxs("div", { className: "nike-footer-grid", style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px", marginBottom: "48px" }, children: [_jsxs("div", { children: [_jsx("p", { style: { fontSize: "12px", fontWeight: 700, marginBottom: "16px", letterSpacing: "0.5px", color: "#888" }, children: "FIND A STORE" }), _jsx("p", { style: { fontSize: "12px", fontWeight: 700, marginBottom: "16px", letterSpacing: "0.5px", color: "#888" }, children: "BECOME A MEMBER" }), _jsx("p", { style: { fontSize: "12px", fontWeight: 700, marginBottom: "16px", letterSpacing: "0.5px", color: "#888" }, children: "SEND US FEEDBACK" })] }), _jsxs("div", { children: [_jsx("p", { style: { fontSize: "12px", fontWeight: 700, marginBottom: "16px", letterSpacing: "0.5px", color: "#888" }, children: "GET HELP" }), _jsx("p", { style: { fontSize: "11px", color: "#aaa", marginBottom: "8px" }, children: "Order Status" }), _jsx("p", { style: { fontSize: "11px", color: "#aaa", marginBottom: "8px" }, children: "Dispatch and Delivery" }), _jsx("p", { style: { fontSize: "11px", color: "#aaa", marginBottom: "8px" }, children: "Returns" }), _jsx("p", { style: { fontSize: "11px", color: "#aaa", marginBottom: "8px" }, children: "Payment Options" }), _jsx("p", { style: { fontSize: "11px", color: "#aaa", marginBottom: "8px" }, children: "Contact Us" })] }), _jsxs("div", { children: [_jsx("p", { style: { fontSize: "12px", fontWeight: 700, marginBottom: "16px", letterSpacing: "0.5px", color: "#888" }, children: "ABOUT NIKE" }), _jsx("p", { style: { fontSize: "11px", color: "#aaa", marginBottom: "8px" }, children: "News" }), _jsx("p", { style: { fontSize: "11px", color: "#aaa", marginBottom: "8px" }, children: "Careers" }), _jsx("p", { style: { fontSize: "11px", color: "#aaa", marginBottom: "8px" }, children: "Investors" }), _jsx("p", { style: { fontSize: "11px", color: "#aaa", marginBottom: "8px" }, children: "Sustainability" })] }), _jsxs("div", { children: [_jsx("p", { style: { fontSize: "12px", fontWeight: 700, marginBottom: "16px", letterSpacing: "0.5px", color: "#888" }, children: "SOCIAL" }), _jsx("p", { style: { fontSize: "11px", color: "#aaa", marginBottom: "8px" }, children: "Instagram" }), _jsx("p", { style: { fontSize: "11px", color: "#aaa", marginBottom: "8px" }, children: "Facebook" }), _jsx("p", { style: { fontSize: "11px", color: "#aaa", marginBottom: "8px" }, children: "Twitter" }), _jsx("p", { style: { fontSize: "11px", color: "#aaa", marginBottom: "8px" }, children: "YouTube" })] })] }), _jsxs("div", { className: "nike-footer-bottom", style: { borderTop: "1px solid #333", paddingTop: "16px", display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#666" }, children: [_jsx("p", { children: "\u00A9 2026 Nike, Inc. All rights reserved" }), _jsxs("div", { style: { display: "flex", gap: "16px" }, children: [_jsx("a", { href: "#", style: { color: "#666", textDecoration: "none" }, children: "Guides" }), _jsx("a", { href: "#", style: { color: "#666", textDecoration: "none" }, children: "Terms of Sale" }), _jsx("a", { href: "#", style: { color: "#666", textDecoration: "none" }, children: "Terms of Use" }), _jsx("a", { href: "#", style: { color: "#666", textDecoration: "none" }, children: "Privacy & Cookie Policy" })] })] })] }) }));
}
/* ---------- Product List View ---------- */
function ProductList({ products, onSelect }) {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "nike-section", style: { maxWidth: "1440px", margin: "0 auto", padding: "48px 48px 0" }, children: [_jsx("h2", { style: { fontSize: "22px", fontWeight: 600, marginBottom: "20px", color: "#111" }, children: "Shop by Sport" }), _jsx("div", { className: "nike-cat-grid", style: { display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "12px" }, children: categoryGrid.map((cat) => (_jsxs("a", { href: "#", style: { textDecoration: "none" }, children: [_jsx("div", { style: { background: "#f5f5f5", borderRadius: "4px", overflow: "hidden", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px" }, children: _jsx("img", { src: cat.img, alt: cat.title, style: { width: "100%", height: "100%", objectFit: "cover" }, loading: "lazy" }) }), _jsx("p", { style: { fontSize: "14px", fontWeight: 500, color: "#111", textAlign: "center" }, children: cat.title })] }, cat.title))) })] }), _jsxs("div", { className: "nike-section", style: { maxWidth: "1440px", margin: "0 auto", padding: "48px 48px 64px" }, children: [_jsx("h2", { style: { fontSize: "22px", fontWeight: 600, marginBottom: "20px", color: "#111" }, children: "Trending" }), _jsx("div", { className: "nike-prod-grid", style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }, children: products.slice(0, 6).map((product) => (_jsxs("div", { onClick: () => onSelect(product), style: { textDecoration: "none", color: "inherit", cursor: "pointer" }, children: [_jsx("div", { className: "nike-prod-img", style: { background: "#f5f5f5", borderRadius: "4px", overflow: "hidden", aspectRatio: "1", marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "center" }, children: _jsx("img", { src: product.gallery[0], alt: product.name, style: { width: "80%", height: "80%", objectFit: "contain", mixBlendMode: "multiply" }, loading: "lazy" }) }), _jsx("p", { style: { fontSize: "14px", color: "#555", marginBottom: "2px" }, children: product.category }), _jsx("p", { style: { fontSize: "15px", fontWeight: 600, marginBottom: "4px", color: "#111" }, children: product.name }), _jsxs("p", { style: { fontSize: "15px", fontWeight: 600, color: "#111" }, children: ["$", product.price] })] }, product.id))) })] })] }));
}
/* ---------- Product Detail View ---------- */
function ProductDetail({ product, onBack, onAddToCart, addedMessage, }) {
    const [selectedImg, setSelectedImg] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const handleAdd = () => {
        if (selectedSize && selectedColor) {
            onAddToCart(selectedSize, selectedColor);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { style: { borderBottom: "1px solid #e5e5e5" }, children: _jsxs("div", { style: { maxWidth: "1440px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", height: "56px" }, children: [_jsxs("button", { onClick: onBack, style: { background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#111", display: "flex", alignItems: "center", gap: "6px", fontWeight: 500 }, children: [_jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("path", { d: "M19 12H5M12 19l-7-7 7-7" }) }), "Back"] }), _jsx("span", { style: { fontSize: "20px", fontWeight: 800, letterSpacing: "-0.5px", color: "#111" }, children: "NIKE" }), _jsx("div", { style: { width: "60px" } })] }) }), _jsxs("div", { className: "nike-detail", style: { maxWidth: "1200px", margin: "0 auto", padding: "32px 48px", display: "flex", gap: "48px" }, children: [_jsxs("div", { className: "nike-detail-gallery", style: { flex: "1", maxWidth: "600px" }, children: [_jsx("div", { style: { background: "#f5f5f5", borderRadius: "4px", overflow: "hidden", aspectRatio: "1", marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "center" }, children: _jsx("img", { src: product.gallery[selectedImg], alt: product.name, style: { width: "85%", height: "85%", objectFit: "contain", mixBlendMode: "multiply" } }) }), _jsx("div", { className: "nike-thumb-grid", style: { display: "flex", gap: "8px" }, children: product.gallery.map((img, i) => (_jsx("button", { onClick: () => setSelectedImg(i), style: {
                                        width: "72px", height: "72px", borderRadius: "4px", overflow: "hidden",
                                        border: i === selectedImg ? "2px solid #111" : "2px solid #e5e5e5",
                                        padding: 0, cursor: "pointer", background: "#f5f5f5",
                                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                                    }, children: _jsx("img", { src: img, alt: "", style: { width: "80%", height: "80%", objectFit: "contain", mixBlendMode: "multiply" } }) }, i))) })] }), _jsxs("div", { className: "nike-detail-info", style: { flex: "1", maxWidth: "480px" }, children: [_jsx("p", { style: { fontSize: "14px", color: "#555", marginBottom: "4px" }, children: product.category }), _jsx("h1", { style: { fontSize: "28px", fontWeight: 600, marginBottom: "8px", lineHeight: 1.2 }, children: product.name }), _jsxs("p", { style: { fontSize: "16px", fontWeight: 600, marginBottom: "24px", color: "#111" }, children: ["$", product.price] }), _jsxs("div", { style: { marginBottom: "24px" }, children: [_jsxs("p", { style: { fontSize: "14px", fontWeight: 500, marginBottom: "8px" }, children: ["Colour: ", _jsx("span", { style: { fontWeight: 600 }, children: selectedColor?.name })] }), _jsx("div", { style: { display: "flex", gap: "8px" }, children: product.colors.map((c) => (_jsx("button", { onClick: () => setSelectedColor(c), style: {
                                                width: "36px", height: "36px", borderRadius: "50%",
                                                border: selectedColor?.hex === c.hex ? "2px solid #111" : "2px solid #ddd",
                                                background: c.hex, cursor: "pointer",
                                                outline: selectedColor?.hex === c.hex ? "3px solid #fff" : "none",
                                                outlineOffset: "-4px",
                                            }, title: c.name }, c.hex))) })] }), _jsxs("div", { style: { marginBottom: "24px" }, children: [_jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "8px" }, children: [_jsx("p", { style: { fontSize: "14px", fontWeight: 500 }, children: "Select Size" }), _jsx("a", { href: "#", style: { fontSize: "13px", color: "#111", textDecoration: "underline", fontWeight: 500 }, children: "Size Guide" })] }), _jsx("div", { className: "nike-size-grid", style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }, children: product.sizes.map((s) => (_jsx("button", { onClick: () => setSelectedSize(s), style: {
                                                padding: "10px 0",
                                                border: selectedSize === s ? "2px solid #111" : "1px solid #ddd",
                                                borderRadius: "4px",
                                                background: selectedSize === s ? "#111" : "#fff",
                                                color: selectedSize === s ? "#fff" : "#111",
                                                cursor: "pointer", fontSize: "14px", fontWeight: 500,
                                            }, children: s }, s))) })] }), _jsx("button", { onClick: handleAdd, style: {
                                    width: "100%", padding: "16px",
                                    background: selectedSize ? "#111" : "#ccc",
                                    color: "#fff", border: "none", borderRadius: "30px",
                                    fontSize: "16px", fontWeight: 600,
                                    cursor: selectedSize ? "pointer" : "not-allowed",
                                    marginBottom: "12px",
                                }, disabled: !selectedSize, children: selectedSize ? "Add to Bag" : "Select a Size" }), addedMessage && (_jsx("p", { style: { fontSize: "13px", color: "#228B22", fontWeight: 500, textAlign: "center", marginBottom: "12px" }, children: addedMessage })), _jsx("p", { style: { fontSize: "15px", color: "#444", lineHeight: 1.6, marginBottom: "24px" }, children: product.description }), _jsxs("div", { style: { borderTop: "1px solid #e5e5e5", paddingTop: "16px" }, children: [_jsx("p", { style: { fontSize: "14px", fontWeight: 600, marginBottom: "8px" }, children: "Features" }), _jsx("ul", { style: { paddingLeft: "20px", fontSize: "14px", color: "#555", lineHeight: 1.8 }, children: product.features.map((f, i) => _jsx("li", { children: f }, i)) })] })] })] })] }));
}
/* ---------- Cart View ---------- */
function CartView({ items, onBack, onRemove, onUpdateQty, }) {
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const estimatedTax = items.length > 0 ? Math.round(subtotal * 0.13) : 0;
    const total = subtotal + estimatedTax;
    const labelSx = { fontSize: "14px", color: "#555" };
    const valueSx = { fontSize: "14px", color: "#111" };
    if (items.length === 0) {
        return (_jsxs("div", { style: { color: "#111", background: "#fff", minHeight: "100vh" }, children: [_jsx("div", { style: { borderBottom: "1px solid #e5e5e5", background: "#fff" }, children: _jsx("div", { style: { maxWidth: "1440px", margin: "0 auto", display: "flex", alignItems: "center", padding: "0 48px", height: "56px" }, children: _jsxs("button", { onClick: onBack, style: { background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#111", display: "flex", alignItems: "center", gap: "6px", fontWeight: 500 }, children: [_jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#111", strokeWidth: "2", children: _jsx("path", { d: "M19 12H5M12 19l-7-7 7-7" }) }), "Back"] }) }) }), _jsxs("div", { style: { maxWidth: "800px", margin: "80px auto", textAlign: "center" }, children: [_jsxs("svg", { width: "48", height: "48", viewBox: "0 0 24 24", fill: "none", stroke: "#ccc", strokeWidth: "1.5", style: { marginBottom: "16px" }, children: [_jsx("path", { d: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" }), _jsx("path", { d: "M3 6h18" }), _jsx("path", { d: "M16 10a4 4 0 01-8 0" })] }), _jsx("h2", { style: { fontSize: "22px", fontWeight: 600, marginBottom: "8px", color: "#111" }, children: "Your Bag is Empty" }), _jsx("p", { style: { color: "#555", marginBottom: "24px" }, children: "Looks like you haven't added anything yet." }), _jsx("button", { onClick: onBack, style: { background: "#111", color: "#fff", border: "none", borderRadius: "30px", padding: "12px 28px", fontSize: "15px", fontWeight: 600, cursor: "pointer" }, children: "Continue Shopping" })] })] }));
    }
    return (_jsxs("div", { style: { color: "#111", background: "#fff", minHeight: "100vh" }, children: [_jsx("div", { style: { borderBottom: "1px solid #e5e5e5", background: "#fff" }, children: _jsxs("div", { style: { maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", height: "56px" }, children: [_jsxs("button", { onClick: onBack, style: { background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#111", display: "flex", alignItems: "center", gap: "6px", fontWeight: 500 }, children: [_jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#111", strokeWidth: "2", children: _jsx("path", { d: "M19 12H5M12 19l-7-7 7-7" }) }), "Continue Shopping"] }), _jsx("span", { style: { fontSize: "20px", fontWeight: 800, letterSpacing: "-0.5px", color: "#111" }, children: "NIKE" }), _jsx("div", { style: { width: "120px" } })] }) }), _jsxs("div", { className: "nike-cart-inner", style: { maxWidth: "1200px", margin: "0 auto", padding: "32px 48px" }, children: [_jsxs("h1", { style: { fontSize: "28px", fontWeight: 600, marginBottom: "24px", color: "#111" }, children: ["Bag (", items.reduce((s, i) => s + i.quantity, 0), " Items)"] }), _jsxs("div", { className: "nike-cart-layout", style: { display: "flex", gap: "48px", alignItems: "flex-start" }, children: [_jsx("div", { className: "nike-cart-items", style: { flex: "2", minWidth: 0 }, children: items.map((item, idx) => (_jsxs("div", { className: "nike-cart-item", style: { display: "flex", gap: "16px", padding: "16px 0", borderBottom: "1px solid #e5e5e5" }, children: [_jsx("div", { className: "nike-cart-item-img", style: { width: "120px", height: "120px", background: "#f5f5f5", borderRadius: "4px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }, children: _jsx("img", { src: item.product.gallery[0], alt: item.product.name, style: { width: "85%", height: "85%", objectFit: "contain", mixBlendMode: "multiply" } }) }), _jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }, children: [_jsxs("div", { children: [_jsx("p", { style: { fontSize: "16px", fontWeight: 600, color: "#111", marginBottom: "2px" }, children: item.product.name }), _jsx("p", { style: { fontSize: "13px", color: "#555", marginBottom: "2px" }, children: item.product.category }), _jsxs("p", { style: { fontSize: "13px", color: "#555" }, children: ["Size: ", item.size, " | Colour: ", item.color.name] })] }), _jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px", flexWrap: "wrap" }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [_jsx("select", { value: item.quantity, onChange: (e) => onUpdateQty(idx, Number(e.target.value)), style: { padding: "4px 8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", background: "#fff", color: "#111" }, children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (_jsx("option", { value: n, children: n }, n))) }), _jsx("button", { onClick: () => onRemove(idx), style: { background: "none", border: "none", cursor: "pointer", fontSize: "13px", color: "#555", textDecoration: "underline" }, children: "Remove" })] }), _jsxs("p", { style: { fontSize: "16px", fontWeight: 600, color: "#111" }, children: ["$", item.product.price * item.quantity] })] })] })] }, idx))) }), _jsx("div", { className: "nike-cart-summary", style: { flex: "1", maxWidth: "320px", minWidth: 0 }, children: _jsxs("div", { style: { background: "#f5f5f5", borderRadius: "8px", padding: "24px", position: "sticky", top: "24px" }, children: [_jsx("h3", { style: { fontSize: "18px", fontWeight: 600, marginBottom: "16px", color: "#111" }, children: "Summary" }), _jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "8px" }, children: [_jsx("span", { style: labelSx, children: "Subtotal" }), _jsxs("span", { style: valueSx, children: ["$", subtotal] })] }), _jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "8px" }, children: [_jsx("span", { style: labelSx, children: "Estimated Tax" }), _jsxs("span", { style: valueSx, children: ["$", estimatedTax] })] }), _jsxs("div", { style: { borderTop: "1px solid #ddd", margin: "12px 0", paddingTop: "12px", display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: 600 }, children: [_jsx("span", { style: { color: "#111" }, children: "Total" }), _jsxs("span", { style: { color: "#111" }, children: ["$", total] })] }), _jsx("button", { style: { width: "100%", padding: "14px 0", background: "#111", color: "#fff", border: "none", borderRadius: "30px", fontSize: "15px", fontWeight: 600, cursor: "pointer", marginTop: "8px" }, children: "Checkout" }), _jsx("p", { style: { fontSize: "11px", color: "#888", textAlign: "center", marginTop: "12px" }, children: "Free delivery and returns on all orders." })] }) })] })] })] }));
}
/* ---------- App Shell ---------- */
export default function App({ data }) {
    const [view, setView] = useState({ name: "list" });
    const [cart, setCart] = useState([]);
    const [addedMessage, setAddedMessage] = useState(null);
    const products = data?.products ?? [];
    const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
    const addToCart = useCallback((product, size, color) => {
        setCart((prev) => {
            const existing = prev.findIndex((item) => item.product.id === product.id && item.size === size && item.color.name === color.name);
            if (existing >= 0) {
                const next = [...prev];
                next[existing] = { ...next[existing], quantity: next[existing].quantity + 1 };
                return next;
            }
            return [...prev, { product, size, color, quantity: 1 }];
        });
        setAddedMessage(`Added to Bag — ${product.name} (${size})`);
        setTimeout(() => setAddedMessage(null), 3000);
    }, []);
    const removeFromCart = useCallback((idx) => setCart((prev) => prev.filter((_, i) => i !== idx)), []);
    const updateQty = useCallback((idx, qty) => setCart((prev) => { const n = [...prev]; n[idx] = { ...n[idx], quantity: qty }; return n; }), []);
    const content = useMemo(() => {
        if (!data?.products) {
            return _jsx("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#fff" }, children: _jsx("p", { style: { color: "#999", fontSize: "16px" }, children: "Loading products..." }) });
        }
        if (view.name === "detail") {
            return _jsxs(_Fragment, { children: [_jsx(TopNav, { cartCount: cartCount, onCartClick: () => setView({ name: "cart" }) }), _jsx(ProductDetail, { product: view.product, onBack: () => setView({ name: "list" }), onAddToCart: (size, color) => addToCart(view.product, size, color), addedMessage: addedMessage }), _jsx(Footer, {})] });
        }
        if (view.name === "cart") {
            return _jsxs(_Fragment, { children: [_jsx(CartView, { items: cart, onBack: () => setView({ name: "list" }), onRemove: removeFromCart, onUpdateQty: updateQty }), _jsx(Footer, {})] });
        }
        return _jsxs(_Fragment, { children: [_jsx(TopNav, { cartCount: cartCount, onCartClick: () => setView({ name: "cart" }) }), _jsx(ProductList, { products: products, onSelect: (product) => setView({ name: "detail", product }) }), _jsx(Footer, {})] });
    }, [data, view, cart, cartCount, addedMessage, addToCart, removeFromCart, updateQty]);
    return _jsxs("div", { style: { background: "#fff", minHeight: "100vh" }, children: [_jsx("style", { children: responsiveCSS }), content] });
}
