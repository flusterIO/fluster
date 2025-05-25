import { useMemo, type ReactNode } from "react";
import { useGlobalKeymap } from "#/keymap/state/hooks/use_global_keymap";
import { getBrowserRouter } from "#/router/data/main_router_routes";
import { RouterProvider } from "react-router";
import { getMdxNoteFromFsRoute } from "#/router/data/app_routes";
import { getEditNoteSplitViewPageUrl } from "#/editor/presentation/split_view/edit_note_split_view_page";

const App = (): ReactNode => {
    useGlobalKeymap();
    const router = useMemo(() => getBrowserRouter(), []);
    /* TEMPORARY: Remove this obviously. */
    router.navigate(
        getEditNoteSplitViewPageUrl(
            "/Users/bigsexy/Desktop/notes/content/cheatsheets/fluster/fluster_sync_method.mdx"
        )
    );
    return <RouterProvider router={router} />;
};

App.displayName = "App";

export default App;
