import React, { useEffect, useRef, type ReactNode } from "react";
import PanelRightSwitch from "./panel_right_switch";
import {
    ImperativePanelHandle,
    Panel,
    PanelResizeHandle,
} from "react-resizable-panels";
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
        const ref = useRef<ImperativePanelHandle>(null!);
        useEffect(() => {
            ref.current.getSize();
        }, []);
        if (!open) {
            return null;
        }
        return (
            <>
                <PanelResizeHandle />
                <Panel
                    ref={ref}
                    id="panel-right"
                    defaultSize={25}
                    /* minSize={64} */
                    order={order}
                    className="border-l h-full pt-8 px-6 pb-6 relative origin-right !overflow-y-auto"
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
