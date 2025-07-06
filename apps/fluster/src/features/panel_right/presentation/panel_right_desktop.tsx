import React, { type ReactNode } from "react";
import PanelRightSwitch from "./panel_right_switch";
import { Panel, PanelResizeHandle } from "react-resizable-panels";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";

const connector = connect((state: AppState) => ({
    open: state.panelRight.open,
}));

interface PanelRightDesktopProps {
    open: boolean;
    order?: number;
}

const PanelRightDesktop = connector(
    ({ open, order = 3 }: PanelRightDesktopProps): ReactNode => {
        if (!open) {
            return null;
        }
        return (
            <>
                <PanelResizeHandle />
                <Panel
                    id="panel-right"
                    defaultSize={25}
                    maxSize={50}
                    order={order}
                    className="border-l h-full pt-8 px-6 pb-2 relative origin-right !overflow-y-auto"
                    onResize={() => {
                        window.dispatchEvent(
                            new CustomEvent("panel-resize", {
                                detail: {
                                    panel: "right",
                                },
                            })
                        );
                    }}
                >
                    <PanelRightSwitch />
                </Panel>
            </>
        );
    }
);

PanelRightDesktop.displayName = "PanelRightDesktop";

export default PanelRightDesktop;
