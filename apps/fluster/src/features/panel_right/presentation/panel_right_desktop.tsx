import React, { type ReactNode } from "react";
import { ResizableBox } from "react-resizable";
import PanelRightSwitch from "./panel_right_switch";
import { Panel } from "react-resizable-panels";

interface PanelRightDesktopProps { }

const PanelRightDesktop = (props: PanelRightDesktopProps): ReactNode => {
    return (
        /* @ts-ignore */
        <Panel
            defaultSize={200}
            className="border-l h-full pt-8 px-6 pb-6 relative origin-right"
        >
            <PanelRightSwitch />
        </Panel>
    );
};

PanelRightDesktop.displayName = "PanelRightDesktop";

export default PanelRightDesktop;
