import PanelLeftDesktop from "#/panel_left/presentation/panel_left_desktop";
import PanelRightDesktop from "#/panel_right/presentation/panel_right_desktop";
import React, { type ReactNode } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Outlet } from "react-router";

export const ScaffoldWithSidePanels = (): ReactNode => {
    return (
        <PanelGroup autoSaveId={"scaffold-panels"} direction="horizontal">
            <PanelLeftDesktop />
            <PanelResizeHandle />
            <Panel>
                <Outlet />
            </Panel>
            <PanelResizeHandle />
            <PanelRightDesktop />
        </PanelGroup>
    );
};

ScaffoldWithSidePanels.displayName = "DesktopScaffold";
