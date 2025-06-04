import {
    AppRoutes,
    ResourceRoutes,
} from "../src/features/router/data/app_routes";
import {
    type RouteConfig,
    index,
    layout,
    prefix,
    route,
} from "@react-router/dev/routes";

export default [
    route(
        AppRoutes.onboarding,
        "../src/features/onboarding/presentation/onboarding_page.tsx"
    ),
    layout("../src/features/scaffold/presentation/desktop_scaffold.tsx", [
        index("../src/features/dashboard/routes/dashboard_route.tsx"),
        route(
            AppRoutes.bibliography,
            "../src/features/bibliography/presentation/bib_page.tsx"
        ),
        route(
            AppRoutes.dictionary,
            "../src/features/dictionary/presentation/dictionary_page.tsx"
        ),
        route(
            AppRoutes.kanbanBoards,
            "../src/features/kanban/presentation/kanban_board_list.tsx"
        ),
        route(
            AppRoutes.embeddedDocs,
            "../src/features/embedded_docs/presentation/embedded_docs_dashboard/index.tsx"
        ),
        route(
            AppRoutes.bookmarks,
            "../src/features/bookmark/presentation/bookmarks_page/index.tsx"
        ),
        route(
            AppRoutes.taskLists,
            "../src/features/task_manager/presentation/task_lists_page/index.tsx"
        ),
    ]),
    layout("../src/features/router/presentation/dashboard_scaffold.tsx", [
        route(
            AppRoutes.settings,
            "../src/features/settings/presentation/settings_page.tsx"
        ),

        route(
            AppRoutes.equations,
            "../src/features/math/presentation/equations_page/main.tsx"
        ),
        route(
            AppRoutes.splitViewEditMdx,
            "../src/features/editor/presentation/split_view/edit_note_split_view_page.tsx"
        ),
        route(
            AppRoutes.snippets,
            "../src/features/snippets/presentation/snippets_page.tsx"
        ),
        ...prefix("mdx", [
            route(
                AppRoutes.viewMdxNote,
                "../src/features/mdx/presentation/mdx_note_by_id_page.tsx"
            ),
        ]),
    ]),
    // ...prefix("assets", [
    //     route(
    //         ResourceRoutes.mathjax,
    //         "../src/features/math/data/routes/mathjax_route.tsx"
    //     ),
    //     route(
    //         ResourceRoutes.mathjaxFonts,
    //         "../src/features/math/data/routes/mathjax_fonts_route.tsx"
    //     ),
    // ]),
    // pattern ^           ^ module file
] satisfies RouteConfig;
