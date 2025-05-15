import { createBrowserRouter } from "react-router";
import DashboardPage from "../../dashboard/presentation/page";
import { Settings } from "lucide-react";
import DesktopScaffold from "../../scaffold/presentation/desktop_scaffold";
import { DashboardScaffold } from "../presentation/dashboard_scaffold";

export enum MainRouterRoute {
    dashboard = "/",
    settings = "settings",
}

export const getBrowserRouter = () => {
    return createBrowserRouter([
        {
            Component: DashboardScaffold,
            children: [
                { index: true, Component: DashboardPage },
                { path: MainRouterRoute.settings, Component: Settings },
            ],
        },
    ]);
};
