import React, { useMemo, type ReactNode } from "react";
import { useGlobalKeymap } from "#/keymap/state/hooks/use_global_keymap";
import { getBrowserRouter } from "#/router/data/main_router_routes";
import { RouterProvider } from "react-router";
import { ResourceRoutes } from "#/router/data/app_routes";

const App = (): ReactNode => {
    window.MathJax = {
        /* @ts-expect-error -- Not sure if this is working but I'm leaving it until all math is rendering properly. */
        "HTML-CSS": { linebreaks: { automatic: true } },
        tex: {
            inlineMath: [["$", "$"]],
        },
        menuSettings: {
            autocollapse: true,
        },
        chtml: {
            minScale: 0.2,
            fontURL: ResourceRoutes.mathjaxFonts,
        },
    };
    useGlobalKeymap();

    const router = useMemo(() => getBrowserRouter(), []);
    return <RouterProvider router={router} />;
};

App.displayName = "App";

export default App;
