import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/base.css";
import "./styles/global.scss";
import App from "./App";
import ReduxProvider from "@/state/redux_provider";
import CommandPalette from "#/command_palette/presentation/command_palette";
import { CommandPaletteProvider } from "#/command_palette/state/command_palette_provider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ReduxProvider>
      <App />
      <CommandPaletteProvider>
        <CommandPalette />
      </CommandPaletteProvider>
    </ReduxProvider>
  </React.StrictMode>,
);
