import React, { ReactNode, useMemo } from "react";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, RouterProvider } from "react-router";
import { getBrowserRouter } from "#/router/data/main_router_routes";

interface ReduxProviderProps {
    children: ReactNode;
}

const ReduxProvider = ({ children }: ReduxProviderProps) => {
    const router = useMemo(() => getBrowserRouter(), []);
    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    );
};

ReduxProvider.displayName = "ReduxProvider";

export default ReduxProvider;
