import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/base.css";
import "./styles/global.css";
import App from "./App";
import ReduxProvider from "@/state/redux_provider";
import { Router, RouterProvider } from "react-router";
import { getBrowserRouter } from "#/router/data/main_router_routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ReduxProvider>
            <App />
        </ReduxProvider>
    </React.StrictMode>,
);
