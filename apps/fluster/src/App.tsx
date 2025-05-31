import React, { useMemo, type ReactNode } from "react";
import { useGlobalKeymap } from "#/keymap/state/hooks/use_global_keymap";
import { getBrowserRouter } from "#/router/data/main_router_routes";
import { RouterProvider } from "react-router";
import { getEditNoteSplitViewPageUrl } from "#/editor/presentation/split_view/edit_note_split_view_page";
import { PersistGate } from "redux-persist/integration/react";
import store from "@/state/store";
import persistStore from "redux-persist/es/persistStore";

const App = (): ReactNode => {
    useGlobalKeymap();
    const router = useMemo(() => getBrowserRouter(), []);
    /* TEMPORARY: Remove this obviously. */
    router
        .navigate(
            getEditNoteSplitViewPageUrl(
                "/Users/bigsexy/Desktop/notes/content/cheatsheets/fluster/fluster_sync_method.mdx"
            )
        )
        .catch(() => { });

    const persistor = persistStore(store);
    return (
        <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
            <RouterProvider router={router} />
        </PersistGate>
    );
};

App.displayName = "App";

export default App;
