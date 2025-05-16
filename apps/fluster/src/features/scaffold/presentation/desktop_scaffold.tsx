import React, { type ReactNode } from "react";
import DesktopSideNavigation from "./desktop_side_navigation";
import PanelLeftDesktop from "../../panel_left/presentation/panel_left_desktop";
import { Outlet } from "react-router";
import PanelRightDesktop from "../../panel_right/presentation/panel_right_desktop";
import DesktopTitleBar from "./desktop_title_bar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

const DesktopScaffold = (): ReactNode => {
    return (
        <div className="h-full w-full flex flex-row justify-center items-center relative  bg-background text-foreground">
            <DesktopTitleBar />
            <DesktopSideNavigation />
            <Outlet />
        </div>
    );
};

DesktopScaffold.displayName = "DesktopScaffold";

export default DesktopScaffold;
