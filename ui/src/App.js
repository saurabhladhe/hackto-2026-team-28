import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function App({ data }) {
    if (!data?.members || data.type !== "team-directory") {
        return _jsx("p", { children: "No data received." });
    }
    return (_jsxs("div", { style: { padding: "16px", fontFamily: "system-ui, sans-serif" }, children: [_jsx("h2", { style: { marginTop: 0, marginBottom: "12px" }, children: "Team Directory" }), _jsxs("table", { style: {
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "14px",
                }, children: [_jsx("thead", { children: _jsxs("tr", { style: { textAlign: "left", borderBottom: "2px solid #e5e7eb" }, children: [_jsx("th", { style: { padding: "8px 12px" }, children: "Name" }), _jsx("th", { style: { padding: "8px 12px" }, children: "Role" }), _jsx("th", { style: { padding: "8px 12px" }, children: "Office" })] }) }), _jsx("tbody", { children: data.members.map((member, i) => (_jsxs("tr", { style: {
                                borderBottom: "1px solid #e5e7eb",
                                background: i % 2 === 0 ? "transparent" : "#f9fafb",
                            }, children: [_jsx("td", { style: { padding: "8px 12px", fontWeight: 500 }, children: member.name }), _jsx("td", { style: { padding: "8px 12px" }, children: member.role }), _jsx("td", { style: { padding: "8px 12px" }, children: member.office })] }, member.name))) })] })] }));
}
