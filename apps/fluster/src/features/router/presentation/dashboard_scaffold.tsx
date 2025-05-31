import PanelLeftDesktop from "#/panel_left/presentation/panel_left_desktop";
import PanelRightDesktop from "#/panel_right/presentation/panel_right_desktop";
import { SnippetProvider } from "#/snippets/state/snippets_provider";
import React, { type ReactNode } from "react";
import { Panel, PanelGroup } from "react-resizable-panels";
import { Outlet } from "react-router";

export const ScaffoldWithSidePanels = (): ReactNode => {
    return (
        <PanelGroup autoSaveId={"scaffold-panels"} direction="horizontal">
            <SnippetProvider>
                <PanelLeftDesktop />
                <Panel id="main-panel" order={2} defaultSize={50}>
                    <Outlet />
                </Panel>
                <PanelRightDesktop />
            </SnippetProvider>
        </PanelGroup>
    );
};

ScaffoldWithSidePanels.displayName = "DesktopScaffold";
