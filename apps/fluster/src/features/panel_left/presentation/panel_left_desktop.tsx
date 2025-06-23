import React, { type ReactNode } from "react";
import PanelLeftSwitch from "./panel_left_switch";
import { Panel, PanelResizeHandle } from "react-resizable-panels";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";

const connector = connect((state: AppState) => ({
    open: state.panelLeft.open,
}));

interface Props {
    open: boolean;
}

const PanelLeftDesktop = connector(({ open }: Props): ReactNode => {
    if (!open) {
        return null;
    }
    return (
        <>
            <Panel
                id="panel-left"
                defaultSize={25}
                order={1}
                className="border-r h-full pt-8 pb-6 relative !overflow-y-auto"
                onResize={() => {
                    window.dispatchEvent(
                        new CustomEvent("panel-resize", {
                            detail: {
                                panel: "left",
                            },
                        })
                    );
                }}
            >
                <PanelLeftSwitch />
            </Panel>
            <PanelResizeHandle />
        </>
    );
});

PanelLeftDesktop.displayName = "PanelLeftDesktop";

export default PanelLeftDesktop;
