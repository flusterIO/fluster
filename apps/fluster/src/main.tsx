import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/base.css";
import "./styles/global.scss";
import App from "./App";
import ReduxProvider from "@/state/redux_provider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ReduxProvider>
      <App />
    </ReduxProvider>
  </React.StrictMode>,
);
