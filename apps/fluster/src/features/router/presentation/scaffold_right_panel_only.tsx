import PanelRightDesktop from "#/panel_right/presentation/panel_right_desktop";
import React, { type ReactNode } from "react";
import { Panel, PanelGroup } from "react-resizable-panels";
import { Outlet } from "react-router";

export const ScaffoldWithRightPanelOnly = (): ReactNode => {
    return (
        <PanelGroup
            autoSaveId={"scaffold-panels-right-only"}
            direction="horizontal"
        >
            <Panel
                order={1}
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
                    className="flex-grow h-full w-full pt-8 overflow-y-auto"
                >
                    <Outlet />
                </div>
            </Panel>
            <PanelRightDesktop order={2} />
        </PanelGroup>
    );
};

ScaffoldWithRightPanelOnly.displayName = "DesktopScaffold";
