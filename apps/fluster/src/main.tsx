import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/themes.scss";
import "./styles/global.scss";
import App from "./App";
import ReduxProvider from "@/state/redux_provider";
import { DesktopScaffoldProvider } from "#/scaffold/state/scaffold_provider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ReduxProvider>
            <DesktopScaffoldProvider>
                <App />
            </DesktopScaffoldProvider>
        </ReduxProvider>
    </React.StrictMode>,
);
