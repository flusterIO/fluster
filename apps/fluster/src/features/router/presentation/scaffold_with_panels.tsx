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
                <Panel
                    order={2}
                    defaultSize={50}
                    onResize={(s) =>
                        window.dispatchEvent(
                            new CustomEvent("main-panel-resize", {
                                detail: {
                                    width: s,
                                },
                            })
                        )
                    }
                >
                    <div
                        data-main-panel
                        id="scroll-target"
                        className="@container/main-panel flex-grow h-full w-full pt-8 overflow-y-auto"
                    >
                        <Outlet />
                    </div>
                </Panel>
                <PanelRightDesktop />
            </SnippetProvider>
        </PanelGroup>
    );
};

ScaffoldWithSidePanels.displayName = "DesktopScaffold";
