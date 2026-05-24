import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@modelcontextprotocol/ext-apps";
import AppComponent from "./App";
const root = document.getElementById("root");
if (!root)
    throw new Error("Root element not found");
const mcpApp = new App({ name: "hackto-2026", version: "0.1.0" });
function Root() {
    const [data, setData] = useState(null);
    useEffect(() => {
        mcpApp.ontoolresult = (result) => {
            const sc = result.structuredContent ?? null;
            setData(sc);
        };
        mcpApp.connect();
    }, []);
    return (_jsx(StrictMode, { children: _jsx(AppComponent, { data: data, mcpApp: mcpApp }) }));
}
createRoot(root).render(_jsx(Root, {}));
