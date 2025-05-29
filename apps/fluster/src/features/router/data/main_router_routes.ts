import { createBrowserRouter } from "react-router";
import { Settings } from "lucide-react";
import DesktopScaffold from "../../scaffold/presentation/desktop_scaffold";
import { ScaffoldWithSidePanels } from "../presentation/dashboard_scaffold";
import SnippetsPage from "#/snippets/presentation/snippets_page";
import DictionaryPage from "#/dictionary/presentation/dictionary_page";
import DashboardPage from "#/dashboard/presentation/dashboard_page";
import BibliographyPage from "#/bibliography/presentation/bib_page";
import { AppRoutes } from "./app_routes";
import KanbanBoardList from "#/kanban/presentation/kanban_board_list";
import MdxNotePage from "#/mdx/presentation/mdx_note_page";
import EditNoteSplitViewPage from "#/editor/presentation/split_view/edit_note_split_view_page";
import EquationsPage from "#/math/presentation/equations_page/main";
import EmbeddedDocsDashboardPage from "#/embedded_docs/presentation/embedded_docs_dashboard";
import BookmarksPage from "#/bookmark/presentation/bookmarks_page";
import { TaskListsPage } from "#/task_manager/presentation/task_lists_page";

export const getBrowserRouter = () => {
    return createBrowserRouter([
        {
            path: AppRoutes.dashboard,
            Component: DesktopScaffold,
            children: [
                { index: true, Component: DashboardPage },
                {
                    path: AppRoutes.dashboard,
                    Component: DashboardPage,
                },
                {
                    path: AppRoutes.bibliography,
                    Component: BibliographyPage,
                },
                {
                    path: AppRoutes.dictionary,
                    Component: DictionaryPage,
                },
                {
                    path: AppRoutes.kanbanBoards,
                    Component: KanbanBoardList,
                },
                {
                    path: AppRoutes.embeddedDocs,
                    Component: EmbeddedDocsDashboardPage,
                },
                {
                    path: AppRoutes.bookmarks,
                    Component: BookmarksPage,
                },
                {
                    path: AppRoutes.taskLists,
                    Component: TaskListsPage,
                },
                {
                    Component: ScaffoldWithSidePanels,
                    children: [
                        {
                            path: AppRoutes.settings,
                            Component: Settings,
                        },
                        {
                            path: AppRoutes.viewMdxNote,
                            Component: MdxNotePage,
                        },
                        {
                            path: AppRoutes.equations,
                            Component: EquationsPage,
                        },
                        {
                            path: AppRoutes.splitViewEditMdx,
                            Component: EditNoteSplitViewPage,
                        },
                        {
                            path: AppRoutes.snippets,
                            Component: SnippetsPage,
                        },
                    ],
                },
            ],
        },
    ]);
};
