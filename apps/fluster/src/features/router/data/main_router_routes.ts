import { createBrowserRouter } from "react-router";
import { Settings } from "lucide-react";
import DesktopScaffold from "../../scaffold/presentation/desktop_scaffold";
import { ScaffoldWithSidePanels } from "../presentation/dashboard_scaffold";
import SnippetsPage from "#/snippets/presentation/snippets_page";
import DictionaryPage from "#/dictionary/presentation/dictionary_page";
import DashboardPage from "#/dashboard/presentation/dashboard_page";
import BibliographyPage from "#/bibliography/presentation/bib_page";
import { AppRoutes } from "./app_routes";

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
                    Component: ScaffoldWithSidePanels,
                    children: [
                        { path: AppRoutes.settings, Component: Settings },
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
