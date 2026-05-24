import { useState, useMemo, useCallback } from "react";
import type { NikeCatalogData, Product, ProductColor } from "./types";

interface AppProps {
  data: NikeCatalogData | null;
}

type View =
  | { name: "list" }
  | { name: "detail"; product: Product }
  | { name: "cart" };

interface CartItem {
  product: Product;
  size: string;
  color: ProductColor;
  quantity: number;
}

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
function TopNav({ cartCount, onCartClick }: { cartCount: number; onCartClick: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="nike-util" style={{ background: "#f5f5f5", borderBottom: "1px solid #e5e5e5", fontSize: "11px" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", display: "flex", justifyContent: "flex-end", gap: "24px", padding: "6px 48px", fontWeight: 500 }}>
          <a href="#" style={{ color: "#111", textDecoration: "none" }}>Find a Store</a>
          <span style={{ color: "#ccc" }}>|</span>
          <a href="#" style={{ color: "#111", textDecoration: "none" }}>Help</a>
          <span style={{ color: "#ccc" }}>|</span>
          <a href="#" style={{ color: "#111", textDecoration: "none" }}>Join Us</a>
          <span style={{ color: "#ccc" }}>|</span>
          <a href="#" style={{ color: "#111", textDecoration: "none" }}>Sign In</a>
        </div>
      </div>
      <div style={{ borderBottom: "1px solid #e5e5e5" }}>
        <div className="nike-nav-inner" style={{ maxWidth: "1440px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", height: "64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button onClick={() => setMenuOpen(!menuOpen)} className="nike-mobile-nav-btn" style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2">
                {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></>}
              </svg>
            </button>
            <span style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.5px", color: "#111", cursor: "pointer" }}>NIKE</span>
          </div>
          <div className="nike-desktop-nav" style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            {navItems.map((item) => (
              <a key={item} href="#" style={{ color: "#111", textDecoration: "none", fontSize: "16px", fontWeight: 500, letterSpacing: "0.3px", padding: "20px 0" }}>
                {item}
              </a>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div className="nike-desktop-nav" style={{ position: "relative" }}>
              <input type="text" placeholder="Search" style={{ background: "#f5f5f5", border: "none", borderRadius: "20px", padding: "8px 16px 8px 40px", fontSize: "14px", width: "180px", outline: "none" }} />
              <svg style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <button onClick={onCartClick} style={{ background: "none", border: "none", cursor: "pointer", position: "relative", padding: "4px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {cartCount > 0 && (
                <span style={{ position: "absolute", top: "-4px", right: "-6px", background: "#111", color: "#fff", borderRadius: "50%", width: "18px", height: "18px", fontSize: "11px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div style={{ background: "#fff", borderBottom: "1px solid #e5e5e5", padding: "12px 16px" }}>
            {navItems.map((item) => (
              <a key={item} href="#" style={{ display: "block", padding: "12px 0", color: "#111", textDecoration: "none", fontSize: "16px", fontWeight: 500, borderBottom: "1px solid #f5f5f5" }}>
                {item}
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <div style={{ background: "#111", color: "#fff" }}>
      <div className="nike-footer-inner" style={{ maxWidth: "1440px", margin: "0 auto", padding: "48px 48px 24px" }}>
        <div className="nike-footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px", marginBottom: "48px" }}>
          <div>
            <p style={{ fontSize: "12px", fontWeight: 700, marginBottom: "16px", letterSpacing: "0.5px", color: "#888" }}>FIND A STORE</p>
            <p style={{ fontSize: "12px", fontWeight: 700, marginBottom: "16px", letterSpacing: "0.5px", color: "#888" }}>BECOME A MEMBER</p>
            <p style={{ fontSize: "12px", fontWeight: 700, marginBottom: "16px", letterSpacing: "0.5px", color: "#888" }}>SEND US FEEDBACK</p>
          </div>
          <div>
            <p style={{ fontSize: "12px", fontWeight: 700, marginBottom: "16px", letterSpacing: "0.5px", color: "#888" }}>GET HELP</p>
            <p style={{ fontSize: "11px", color: "#aaa", marginBottom: "8px" }}>Order Status</p>
            <p style={{ fontSize: "11px", color: "#aaa", marginBottom: "8px" }}>Dispatch and Delivery</p>
            <p style={{ fontSize: "11px", color: "#aaa", marginBottom: "8px" }}>Returns</p>
            <p style={{ fontSize: "11px", color: "#aaa", marginBottom: "8px" }}>Payment Options</p>
            <p style={{ fontSize: "11px", color: "#aaa", marginBottom: "8px" }}>Contact Us</p>
          </div>
          <div>
            <p style={{ fontSize: "12px", fontWeight: 700, marginBottom: "16px", letterSpacing: "0.5px", color: "#888" }}>ABOUT NIKE</p>
            <p style={{ fontSize: "11px", color: "#aaa", marginBottom: "8px" }}>News</p>
            <p style={{ fontSize: "11px", color: "#aaa", marginBottom: "8px" }}>Careers</p>
            <p style={{ fontSize: "11px", color: "#aaa", marginBottom: "8px" }}>Investors</p>
            <p style={{ fontSize: "11px", color: "#aaa", marginBottom: "8px" }}>Sustainability</p>
          </div>
          <div>
            <p style={{ fontSize: "12px", fontWeight: 700, marginBottom: "16px", letterSpacing: "0.5px", color: "#888" }}>SOCIAL</p>
            <p style={{ fontSize: "11px", color: "#aaa", marginBottom: "8px" }}>Instagram</p>
            <p style={{ fontSize: "11px", color: "#aaa", marginBottom: "8px" }}>Facebook</p>
            <p style={{ fontSize: "11px", color: "#aaa", marginBottom: "8px" }}>Twitter</p>
            <p style={{ fontSize: "11px", color: "#aaa", marginBottom: "8px" }}>YouTube</p>
          </div>
        </div>
        <div className="nike-footer-bottom" style={{ borderTop: "1px solid #333", paddingTop: "16px", display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#666" }}>
          <p>© 2026 Nike, Inc. All rights reserved</p>
          <div style={{ display: "flex", gap: "16px" }}>
            <a href="#" style={{ color: "#666", textDecoration: "none" }}>Guides</a>
            <a href="#" style={{ color: "#666", textDecoration: "none" }}>Terms of Sale</a>
            <a href="#" style={{ color: "#666", textDecoration: "none" }}>Terms of Use</a>
            <a href="#" style={{ color: "#666", textDecoration: "none" }}>Privacy & Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Product List View ---------- */
function ProductList({ products, onSelect }: { products: Product[]; onSelect: (p: Product) => void }) {
  return (
    <>
      <div className="nike-section" style={{ maxWidth: "1440px", margin: "0 auto", padding: "48px 48px 0" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 600, marginBottom: "20px", color: "#111" }}>Shop by Sport</h2>
        <div className="nike-cat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "12px" }}>
          {categoryGrid.map((cat) => (
            <a key={cat.title} href="#" style={{ textDecoration: "none" }}>
              <div style={{ background: "#f5f5f5", borderRadius: "4px", overflow: "hidden", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px" }}>
                <img src={cat.img} alt={cat.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
              </div>
              <p style={{ fontSize: "14px", fontWeight: 500, color: "#111", textAlign: "center" }}>{cat.title}</p>
            </a>
          ))}
        </div>
      </div>

      <div className="nike-section" style={{ maxWidth: "1440px", margin: "0 auto", padding: "48px 48px 64px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 600, marginBottom: "20px", color: "#111" }}>Trending</h2>
        <div className="nike-prod-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
          {products.slice(0, 6).map((product) => (
            <div key={product.id} onClick={() => onSelect(product)} style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
              <div className="nike-prod-img" style={{ background: "#f5f5f5", borderRadius: "4px", overflow: "hidden", aspectRatio: "1", marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={product.gallery[0]} alt={product.name} style={{ width: "80%", height: "80%", objectFit: "contain", mixBlendMode: "multiply" }} loading="lazy" />
              </div>
              <p style={{ fontSize: "14px", color: "#555", marginBottom: "2px" }}>{product.category}</p>
              <p style={{ fontSize: "15px", fontWeight: 600, marginBottom: "4px", color: "#111" }}>{product.name}</p>
              <p style={{ fontSize: "15px", fontWeight: 600, color: "#111" }}>${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ---------- Product Detail View ---------- */
function ProductDetail({
  product,
  onBack,
  onAddToCart,
  addedMessage,
}: {
  product: Product;
  onBack: () => void;
  onAddToCart: (size: string, color: ProductColor) => void;
  addedMessage: string | null;
}) {
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(product.colors[0]);

  const handleAdd = () => {
    if (selectedSize && selectedColor) {
      onAddToCart(selectedSize, selectedColor);
    }
  };

  return (
    <>
      <div style={{ borderBottom: "1px solid #e5e5e5" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", height: "56px" }}>
          <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#111", display: "flex", alignItems: "center", gap: "6px", fontWeight: 500 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back
          </button>
          <span style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.5px", color: "#111" }}>NIKE</span>
          <div style={{ width: "60px" }} />
        </div>
      </div>

      <div className="nike-detail" style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 48px", display: "flex", gap: "48px" }}>
        <div className="nike-detail-gallery" style={{ flex: "1", maxWidth: "600px" }}>
          <div style={{ background: "#f5f5f5", borderRadius: "4px", overflow: "hidden", aspectRatio: "1", marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={product.gallery[selectedImg]} alt={product.name} style={{ width: "85%", height: "85%", objectFit: "contain", mixBlendMode: "multiply" }} />
          </div>
          <div className="nike-thumb-grid" style={{ display: "flex", gap: "8px" }}>
            {product.gallery.map((img, i) => (
              <button key={i} onClick={() => setSelectedImg(i)} style={{
                width: "72px", height: "72px", borderRadius: "4px", overflow: "hidden",
                border: i === selectedImg ? "2px solid #111" : "2px solid #e5e5e5",
                padding: 0, cursor: "pointer", background: "#f5f5f5",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <img src={img} alt="" style={{ width: "80%", height: "80%", objectFit: "contain", mixBlendMode: "multiply" }} />
              </button>
            ))}
          </div>
        </div>

        <div className="nike-detail-info" style={{ flex: "1", maxWidth: "480px" }}>
          <p style={{ fontSize: "14px", color: "#555", marginBottom: "4px" }}>{product.category}</p>
          <h1 style={{ fontSize: "28px", fontWeight: 600, marginBottom: "8px", lineHeight: 1.2 }}>{product.name}</h1>
          <p style={{ fontSize: "16px", fontWeight: 600, marginBottom: "24px", color: "#111" }}>${product.price}</p>

          <div style={{ marginBottom: "24px" }}>
            <p style={{ fontSize: "14px", fontWeight: 500, marginBottom: "8px" }}>
              Colour: <span style={{ fontWeight: 600 }}>{selectedColor?.name}</span>
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              {product.colors.map((c) => (
                <button key={c.hex} onClick={() => setSelectedColor(c)} style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  border: selectedColor?.hex === c.hex ? "2px solid #111" : "2px solid #ddd",
                  background: c.hex, cursor: "pointer",
                  outline: selectedColor?.hex === c.hex ? "3px solid #fff" : "none",
                  outlineOffset: "-4px",
                }} title={c.name} />
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <p style={{ fontSize: "14px", fontWeight: 500 }}>Select Size</p>
              <a href="#" style={{ fontSize: "13px", color: "#111", textDecoration: "underline", fontWeight: 500 }}>Size Guide</a>
            </div>
            <div className="nike-size-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
              {product.sizes.map((s) => (
                <button key={s} onClick={() => setSelectedSize(s)} style={{
                  padding: "10px 0",
                  border: selectedSize === s ? "2px solid #111" : "1px solid #ddd",
                  borderRadius: "4px",
                  background: selectedSize === s ? "#111" : "#fff",
                  color: selectedSize === s ? "#fff" : "#111",
                  cursor: "pointer", fontSize: "14px", fontWeight: 500,
                }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleAdd} style={{
            width: "100%", padding: "16px",
            background: selectedSize ? "#111" : "#ccc",
            color: "#fff", border: "none", borderRadius: "30px",
            fontSize: "16px", fontWeight: 600,
            cursor: selectedSize ? "pointer" : "not-allowed",
            marginBottom: "12px",
          }} disabled={!selectedSize}>
            {selectedSize ? "Add to Bag" : "Select a Size"}
          </button>

          {addedMessage && (
            <p style={{ fontSize: "13px", color: "#228B22", fontWeight: 500, textAlign: "center", marginBottom: "12px" }}>
              {addedMessage}
            </p>
          )}

          <p style={{ fontSize: "15px", color: "#444", lineHeight: 1.6, marginBottom: "24px" }}>{product.description}</p>

          <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: "16px" }}>
            <p style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px" }}>Features</p>
            <ul style={{ paddingLeft: "20px", fontSize: "14px", color: "#555", lineHeight: 1.8 }}>
              {product.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- Cart View ---------- */
function CartView({
  items,
  onBack,
  onRemove,
  onUpdateQty,
}: {
  items: CartItem[];
  onBack: () => void;
  onRemove: (idx: number) => void;
  onUpdateQty: (idx: number, qty: number) => void;
}) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const estimatedTax = items.length > 0 ? Math.round(subtotal * 0.13) : 0;
  const total = subtotal + estimatedTax;

  const labelSx: React.CSSProperties = { fontSize: "14px", color: "#555" };
  const valueSx: React.CSSProperties = { fontSize: "14px", color: "#111" };

  if (items.length === 0) {
    return (
      <div style={{ color: "#111", background: "#fff", minHeight: "100vh" }}>
        <div style={{ borderBottom: "1px solid #e5e5e5", background: "#fff" }}>
          <div style={{ maxWidth: "1440px", margin: "0 auto", display: "flex", alignItems: "center", padding: "0 48px", height: "56px" }}>
            <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#111", display: "flex", alignItems: "center", gap: "6px", fontWeight: 500 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </button>
          </div>
        </div>
        <div style={{ maxWidth: "800px", margin: "80px auto", textAlign: "center" }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" style={{ marginBottom: "16px" }}>
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 01-8 0" />
          </svg>
          <h2 style={{ fontSize: "22px", fontWeight: 600, marginBottom: "8px", color: "#111" }}>Your Bag is Empty</h2>
          <p style={{ color: "#555", marginBottom: "24px" }}>Looks like you haven't added anything yet.</p>
          <button onClick={onBack} style={{ background: "#111", color: "#fff", border: "none", borderRadius: "30px", padding: "12px 28px", fontSize: "15px", fontWeight: 600, cursor: "pointer" }}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ color: "#111", background: "#fff", minHeight: "100vh" }}>
      <div style={{ borderBottom: "1px solid #e5e5e5", background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", height: "56px" }}>
          <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#111", display: "flex", alignItems: "center", gap: "6px", fontWeight: 500 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Continue Shopping
          </button>
          <span style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.5px", color: "#111" }}>NIKE</span>
          <div style={{ width: "120px" }} />
        </div>
      </div>

      <div className="nike-cart-inner" style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 48px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 600, marginBottom: "24px", color: "#111" }}>
          Bag ({items.reduce((s, i) => s + i.quantity, 0)} Items)
        </h1>

        <div className="nike-cart-layout" style={{ display: "flex", gap: "48px", alignItems: "flex-start" }}>
          <div className="nike-cart-items" style={{ flex: "2", minWidth: 0 }}>
            {items.map((item, idx) => (
              <div className="nike-cart-item" key={idx} style={{ display: "flex", gap: "16px", padding: "16px 0", borderBottom: "1px solid #e5e5e5" }}>
                <div className="nike-cart-item-img" style={{ width: "120px", height: "120px", background: "#f5f5f5", borderRadius: "4px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={item.product.gallery[0]} alt={item.product.name} style={{ width: "85%", height: "85%", objectFit: "contain", mixBlendMode: "multiply" }} />
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }}>
                  <div>
                    <p style={{ fontSize: "16px", fontWeight: 600, color: "#111", marginBottom: "2px" }}>{item.product.name}</p>
                    <p style={{ fontSize: "13px", color: "#555", marginBottom: "2px" }}>{item.product.category}</p>
                    <p style={{ fontSize: "13px", color: "#555" }}>Size: {item.size} | Colour: {item.color.name}</p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <select value={item.quantity} onChange={(e) => onUpdateQty(idx, Number(e.target.value))} style={{ padding: "4px 8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", background: "#fff", color: "#111" }}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (<option key={n} value={n}>{n}</option>))}
                      </select>
                      <button onClick={() => onRemove(idx)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "13px", color: "#555", textDecoration: "underline" }}>Remove</button>
                    </div>
                    <p style={{ fontSize: "16px", fontWeight: 600, color: "#111" }}>${item.product.price * item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="nike-cart-summary" style={{ flex: "1", maxWidth: "320px", minWidth: 0 }}>
            <div style={{ background: "#f5f5f5", borderRadius: "8px", padding: "24px", position: "sticky", top: "24px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px", color: "#111" }}>Summary</h3>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={labelSx}>Subtotal</span><span style={valueSx}>${subtotal}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={labelSx}>Estimated Tax</span><span style={valueSx}>${estimatedTax}</span>
              </div>
              <div style={{ borderTop: "1px solid #ddd", margin: "12px 0", paddingTop: "12px", display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: 600 }}>
                <span style={{ color: "#111" }}>Total</span><span style={{ color: "#111" }}>${total}</span>
              </div>
              <button style={{ width: "100%", padding: "14px 0", background: "#111", color: "#fff", border: "none", borderRadius: "30px", fontSize: "15px", fontWeight: 600, cursor: "pointer", marginTop: "8px" }}>Checkout</button>
              <p style={{ fontSize: "11px", color: "#888", textAlign: "center", marginTop: "12px" }}>Free delivery and returns on all orders.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- App Shell ---------- */
export default function App({ data }: AppProps) {
  const [view, setView] = useState<View>({ name: "list" });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addedMessage, setAddedMessage] = useState<string | null>(null);
  const products = data?.products ?? [];

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  const addToCart = useCallback((product: Product, size: string, color: ProductColor) => {
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

  const removeFromCart = useCallback((idx: number) => setCart((prev) => prev.filter((_, i) => i !== idx)), []);
  const updateQty = useCallback((idx: number, qty: number) => setCart((prev) => { const n = [...prev]; n[idx] = { ...n[idx], quantity: qty }; return n; }), []);

  const content = useMemo(() => {
    if (!data?.products) {
      return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#fff" }}><p style={{ color: "#999", fontSize: "16px" }}>Loading products...</p></div>;
    }
    if (view.name === "detail") {
      return <><TopNav cartCount={cartCount} onCartClick={() => setView({ name: "cart" })} /><ProductDetail product={view.product} onBack={() => setView({ name: "list" })} onAddToCart={(size, color) => addToCart(view.product, size, color)} addedMessage={addedMessage} /><Footer /></>;
    }
    if (view.name === "cart") {
      return <><CartView items={cart} onBack={() => setView({ name: "list" })} onRemove={removeFromCart} onUpdateQty={updateQty} /><Footer /></>;
    }
    return <><TopNav cartCount={cartCount} onCartClick={() => setView({ name: "cart" })} /><ProductList products={products} onSelect={(product) => setView({ name: "detail", product })} /><Footer /></>;
  }, [data, view, cart, cartCount, addedMessage, addToCart, removeFromCart, updateQty]);

  return <div style={{ background: "#fff", minHeight: "100vh" }}>
    <style>{responsiveCSS}</style>
    {content}
  </div>;
}
