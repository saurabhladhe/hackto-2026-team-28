import type { NikeCatalogData } from "./types";

interface AppProps {
  data: NikeCatalogData | null;
}

const containerStyle: React.CSSProperties = {
  padding: "24px",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  background: "#1a1a1a",
  color: "#fff",
  minHeight: "100vh",
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "24px",
};

const swooshStyle: React.CSSProperties = {
  color: "#ff6600",
  fontSize: "28px",
  fontWeight: 900,
  letterSpacing: "-1px",
};

const titleStyle: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 600,
  color: "#fff",
  margin: 0,
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "20px",
};

const cardStyle: React.CSSProperties = {
  background: "#2a2a2a",
  borderRadius: "12px",
  overflow: "hidden",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

const imageContainerStyle: React.CSSProperties = {
  width: "100%",
  aspectRatio: "1",
  overflow: "hidden",
  background: "#333",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const imageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const cardBodyStyle: React.CSSProperties = {
  padding: "16px",
};

const categoryBadgeStyle: React.CSSProperties = {
  display: "inline-block",
  background: "#ff6600",
  color: "#fff",
  fontSize: "11px",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  padding: "3px 8px",
  borderRadius: "4px",
  marginBottom: "8px",
};

const productNameStyle: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: 600,
  margin: "0 0 4px",
  lineHeight: 1.3,
};

const priceStyle: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: 700,
  color: "#ff6600",
  margin: 0,
};

export default function App({ data }: AppProps) {
  if (!data?.products || data.type !== "nike-catalog") {
    return (
      <div style={containerStyle}>
        <p style={{ color: "#999" }}>No product data received.</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <span style={swooshStyle}>NIKE</span>
        <span style={{ color: "#666", fontSize: "18px" }}>|</span>
        <h1 style={titleStyle}>Catalog</h1>
      </div>
      <div style={gridStyle}>
        {data.products.map((product) => (
          <div
            key={product.id}
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 102, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={imageContainerStyle}>
              <img
                src={product.imageUrl}
                alt={product.name}
                style={imageStyle}
                loading="lazy"
              />
            </div>
            <div style={cardBodyStyle}>
              <span style={categoryBadgeStyle}>{product.category}</span>
              <p style={productNameStyle}>{product.name}</p>
              <p style={priceStyle}>${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
