import { createBrowserRouter } from "react-router";
import DesktopScaffold from "../../scaffold/presentation/desktop_scaffold";
import { ScaffoldWithSidePanels } from "../presentation/scaffold_with_panels";
import SnippetsPage from "#/snippets/presentation/snippets_page";
import DictionaryPage from "#/dictionary/presentation/dictionary_page";
import DashboardPage from "#/dashboard/presentation/dashboard_page";
import BibliographyPage from "#/bibliography/presentation/bib_page";
import { AppRoutes } from "./app_routes";
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
import { AiChatPage } from "#/ai/presentation/ai_chat_page";
import { PdfPage } from "#/pdf/presentation/pdf_page";
import { ScaffoldWithRightPanelOnly } from "../presentation/scaffold_right_panel_only";
import SearchResultsPage from "#/search/presentation/search_results_page/index";
import { SemanticSearchResultsPage } from "#/search/presentation/semantic_search_results_page";
import { NotebookPage } from "#/jupyter/presentation/notebook_page";
import { ConstantsPage } from "#/math/presentation/constants_page/constants_page";
import { KanbanBoardListPage } from "#/kanban/presentation/kanban_board_list_page/kanban_board_list_page";
import { KanbanBoardPage } from "#/kanban/presentation/kanban_board_page";
import { CodeEditorPage } from "#/editor/presentation/code_editor_page";

export const getBrowserRouter = () => {
    return createBrowserRouter([
        {
            path: AppRoutes.onboarding,
            Component: OnboardingPage,
        },
        {
            Component: DesktopScaffold,
            children: [
                { index: true, Component: DashboardPage },

                {
                    path: AppRoutes.search,
                    Component: SearchResultsPage,
                },
                {
                    path: AppRoutes.full_screen_editor,
                    Component: CodeEditorPage,
                },
                {
                    path: AppRoutes.dashboard,
                    Component: DashboardPage,
                },
                {
                    path: AppRoutes.settings,
                    Component: SettingsPage,
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
                    Component: KanbanBoardListPage,
                    loader: async ({ params }) => {
                        const res = await commands.getKanbanBoardList(null, {
                            page_number: (params.page
                                ? parseInt(params.page)
                                : 1) as unknown as string,
                            per_page: (params.per_page
                                ? parseInt(params.per_page)
                                : 99999) as unknown as string,
                        });
                        if (res.status === "ok") {
                            return {
                                data: res.data,
                            };
                        } else {
                            throw Error("Could not find kanban board with the provided id");
                        }
                    },
                    children: [
                        {
                            path: ":id",
                            Component: KanbanBoardPage,
                            loader: async ({ params }) => {
                                const id = params.id;
                                if (!id) {
                                    throw Error(
                                        "Attempted to access a kanban board without providing an id"
                                    );
                                }
                                const res = await commands.getKanbanBoardById(id);
                                if (res.status === "ok") {
                                    return {
                                        data: res.data,
                                    };
                                } else {
                                    throw Error(
                                        "Could not find kanban board with the provided id"
                                    );
                                }
                            },
                        },
                    ],
                },
                {
                    path: AppRoutes.splitViewEditMdx,
                    Component: EditNoteSplitViewPage,
                },
                {
                    path: AppRoutes.notebookInteractive,
                    Component: NotebookPage,
                },
                {
                    path: AppRoutes.constantsTable,
                    Component: ConstantsPage,
                },
                {
                    path: AppRoutes.embeddedDocs,
                    children: [
                        { index: true, Component: EmbeddedDocsDashboardPage },
                        {
                            path: ":id",
                            loader: async ({ params }) => {
                                const id = params.id as InternalEmbeddedDocsId;
                                const res = await commands.getEmbeddedDoc(id);
                                const withoutFrontMatter = await commands.removeFrontMatter(
                                    res
                                );
                                return {
                                    content: withoutFrontMatter,
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
                    Component: ScaffoldWithRightPanelOnly,
                    children: [
                        {
                            path: AppRoutes.pdf,
                            Component: PdfPage,
                        },
                        {
                            path: AppRoutes.semanticSearch,
                            Component: SemanticSearchResultsPage,
                        },
                    ],
                },
                {
                    Component: ScaffoldWithSidePanels,
                    children: [
                        {
                            path: AppRoutes.taskLists,
                            Component: TaskListsPage,
                        },
                        {
                            path: AppRoutes.viewMdxNote,
                            Component: MdxNoteByFilePathPage,
                        },
                        {
                            path: AppRoutes.aiMainChat,
                            Component: AiChatPage,
                        },
                        {
                            path: AppRoutes.equations,
                            Component: EquationsPage,
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
