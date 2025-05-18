import React, { ReactNode, useMemo } from "react";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, RouterProvider } from "react-router";
import { getBrowserRouter } from "#/router/data/main_router_routes";

interface Props {
    children: ReactNode;
}

const ReduxProvider = ({ children }: Props) => {
    return <Provider store={store}>{children}</Provider>;
};

ReduxProvider.displayName = "ReduxProvider";

export default ReduxProvider;
