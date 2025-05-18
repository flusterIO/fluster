import React, { useMemo, type ReactNode } from "react";
import { useGlobalKeymap } from "#/keymap/state/hooks/use_global_keymap";
import { getBrowserRouter } from "#/router/data/main_router_routes";
import { RouterProvider } from "react-router";

const App = (): ReactNode => {
    useGlobalKeymap();
    const router = useMemo(() => getBrowserRouter(), []);
    return <RouterProvider router={router} />;
};

App.displayName = "App";

export default App;
