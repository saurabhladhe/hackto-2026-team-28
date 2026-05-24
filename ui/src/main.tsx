import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@modelcontextprotocol/ext-apps";
import AppComponent from "./App";
import type { TeamDirectoryData } from "./types";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

const mcpApp = new App({ name: "hackto-2026", version: "0.1.0" });

mcpApp.ontoolresult = (result) => {
  const data = (result as unknown as { structuredContent: TeamDirectoryData }).structuredContent ?? null;
  createRoot(root).render(
    <StrictMode>
      <AppComponent data={data} />
    </StrictMode>
  );
};

mcpApp.connect();
