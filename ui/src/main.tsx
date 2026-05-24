import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@modelcontextprotocol/ext-apps";
import AppComponent from "./App";
import type { AppData } from "./types";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

const mcpApp = new App({ name: "hackto-2026", version: "0.1.0" });

function Root() {
  const [data, setData] = useState<AppData | null>(null);

  useEffect(() => {
    mcpApp.ontoolresult = (result) => {
      const sc = (result as unknown as { structuredContent: AppData }).structuredContent ?? null;
      setData(sc);
    };
    mcpApp.connect();
  }, []);

  return (
    <StrictMode>
      <AppComponent data={data} mcpApp={mcpApp} />
    </StrictMode>
  );
}

createRoot(root).render(<Root />);
