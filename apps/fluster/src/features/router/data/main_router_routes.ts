import { createBrowserRouter } from "react-router";
import DashboardPage from "../../dashboard/presentation/page";
import { Settings } from "lucide-react";
import DesktopScaffold from "../../scaffold/presentation/desktop_scaffold";
import { ScaffoldWithSidePanels } from "../presentation/dashboard_scaffold";

export enum MainRouterRoute {
    dashboard = "/",
    settings = "settings",
}

export const getBrowserRouter = () => {
    return createBrowserRouter([
        {
            path: MainRouterRoute.dashboard,
            Component: DesktopScaffold,
            children: [
                {
                    Component: ScaffoldWithSidePanels,
                    children: [
                        { index: true, Component: DashboardPage },
                        { path: MainRouterRoute.settings, Component: Settings },
                    ],
                },
            ],
        },
    ]);
};
