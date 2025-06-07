import { createBrowserRouter } from "react-router";
import DesktopScaffold from "../../scaffold/presentation/desktop_scaffold";
import { ScaffoldWithSidePanels } from "../presentation/dashboard_scaffold";
import SnippetsPage from "#/snippets/presentation/snippets_page";
import DictionaryPage from "#/dictionary/presentation/dictionary_page";
import DashboardPage from "#/dashboard/presentation/dashboard_page";
import BibliographyPage from "#/bibliography/presentation/bib_page";
import { AppRoutes } from "./app_routes";
import KanbanBoardList from "#/kanban/presentation/kanban_board_list";
import EditNoteSplitViewPage from "#/editor/presentation/split_view/edit_note_split_view_page";
import EquationsPage from "#/math/presentation/equations_page/main";
import EmbeddedDocsDashboardPage from "#/embedded_docs/presentation/embedded_docs_dashboard";
import BookmarksPage from "#/bookmark/presentation/bookmarks_page";
import { TaskListsPage } from "#/task_manager/presentation/task_lists_page";
import EmbeddedDocsByIdPage from "#/embedded_docs/presentation/embedded_docs_by_id/embbed_docs_by_id_page";
import MdxNoteByFilePathPage from "#/mdx/presentation/mdx_note_by_id_page";
import { InternalEmbeddedDocsId, commands } from "@/lib/bindings";
import OnboardingPage from "#/onboarding/presentation/onboarding_page";
import SettingsPage from "#/settings/presentation/settings_page";
import SearchResultsPage from "#/search/presentation/search_results_page";

export const getBrowserRouter = () => {
    return createBrowserRouter([
        {
            path: AppRoutes.onboarding,
            Component: OnboardingPage,
        },
        {
            path: AppRoutes.dashboard,
            Component: DesktopScaffold,
            children: [
                { index: true, Component: DashboardPage },

                {
                    path: AppRoutes.search,
                    Component: SearchResultsPage,
                },
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
                    children: [
                        { index: true, Component: EmbeddedDocsDashboardPage },
                        {
                            path: ":id",
                            loader: async ({ params }) => {
                                const id = params.id as InternalEmbeddedDocsId;
                                return {
                                    content: await commands.getEmbeddedDoc(id),
                                };
                            },
                            Component: EmbeddedDocsByIdPage,
                        },
                    ],
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
                    path: AppRoutes.taskLists,
                    Component: TaskListsPage,
                },
                {
                    Component: ScaffoldWithSidePanels,
                    children: [
                        {
                            path: AppRoutes.settings,
                            Component: SettingsPage,
                        },
                        {
                            path: AppRoutes.viewMdxNote,
                            Component: MdxNoteByFilePathPage,
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
