import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const containerStyle = {
    padding: "24px",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    background: "#1a1a1a",
    color: "#fff",
    minHeight: "100vh",
};
const headerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "24px",
};
const swooshStyle = {
    color: "#ff6600",
    fontSize: "28px",
    fontWeight: 900,
    letterSpacing: "-1px",
};
const titleStyle = {
    fontSize: "20px",
    fontWeight: 600,
    color: "#fff",
    margin: 0,
};
const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
};
const cardStyle = {
    background: "#2a2a2a",
    borderRadius: "12px",
    overflow: "hidden",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
};
const imageContainerStyle = {
    width: "100%",
    aspectRatio: "1",
    overflow: "hidden",
    background: "#333",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};
const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
};
const cardBodyStyle = {
    padding: "16px",
};
const categoryBadgeStyle = {
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
const productNameStyle = {
    fontSize: "15px",
    fontWeight: 600,
    margin: "0 0 4px",
    lineHeight: 1.3,
};
const priceStyle = {
    fontSize: "16px",
    fontWeight: 700,
    color: "#ff6600",
    margin: 0,
};
export default function App({ data }) {
    if (!data?.products || data.type !== "nike-catalog") {
        return (_jsx("div", { style: containerStyle, children: _jsx("p", { style: { color: "#999" }, children: "No product data received." }) }));
    }
    return (_jsxs("div", { style: containerStyle, children: [_jsxs("div", { style: headerStyle, children: [_jsx("span", { style: swooshStyle, children: "NIKE" }), _jsx("span", { style: { color: "#666", fontSize: "18px" }, children: "|" }), _jsx("h1", { style: titleStyle, children: "Catalog" })] }), _jsx("div", { style: gridStyle, children: data.products.map((product) => (_jsxs("div", { style: cardStyle, onMouseEnter: (e) => {
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 102, 0, 0.15)";
                    }, onMouseLeave: (e) => {
                        e.currentTarget.style.transform = "none";
                        e.currentTarget.style.boxShadow = "none";
                    }, children: [_jsx("div", { style: imageContainerStyle, children: _jsx("img", { src: product.imageUrl, alt: product.name, style: imageStyle, loading: "lazy" }) }), _jsxs("div", { style: cardBodyStyle, children: [_jsx("span", { style: categoryBadgeStyle, children: product.category }), _jsx("p", { style: productNameStyle, children: product.name }), _jsxs("p", { style: priceStyle, children: ["$", product.price] })] })] }, product.id))) })] }));
}
