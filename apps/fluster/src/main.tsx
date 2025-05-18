import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/base.css";
import "./styles/global.css";
import App from "./App";
import ReduxProvider from "@/state/redux_provider";
import CommandPalette from "#/command_palette/presentation/command_palette";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ReduxProvider>
      <App />
      <CommandPalette />
    </ReduxProvider>
  </React.StrictMode>,
);
