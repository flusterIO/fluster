import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/base.css";
import "./styles/global.scss";
import App from "./App";
import ReduxProvider from "@/state/redux_provider";
import DesktopScaffold from "#/scaffold/presentation/desktop_scaffold";
import { DesktopScaffoldProvider } from "#/scaffold/state/scaffold_provider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ReduxProvider>
            <DesktopScaffoldProvider>
                <App />
            </DesktopScaffoldProvider>
        </ReduxProvider>
    </React.StrictMode>,
);
