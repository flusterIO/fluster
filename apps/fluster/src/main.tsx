import React from "react";
import ReactDOM from "react-dom/client";
import "@fluster.io/dev/themes.scss";
import "./styles/global.scss";
import "./styles/math.scss";
import App from "./App";
import ReduxProvider from "@/state/redux_provider";
import { DesktopScaffoldProvider } from "#/scaffold/state/scaffold_provider.tsx";
import { HealthProvider } from "#/health/state/health_provider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        {/* <script src={} id="MathJax-script" async></script> */}
        <ReduxProvider>
            <HealthProvider>
                <DesktopScaffoldProvider>
                    <App />
                </DesktopScaffoldProvider>
            </HealthProvider>
        </ReduxProvider>
    </React.StrictMode>
);
