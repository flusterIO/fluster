import React, { type ReactNode } from "react";
import PanelLeftSwitch from "./panel_left_switch";
import { Panel } from "react-resizable-panels";

const PanelLeftDesktop = (): ReactNode => {
    return (
        <Panel
            defaultSize={200}
            className="border-r h-full pt-8 px-6 pb-6 relative"
        >
            <PanelLeftSwitch />
        </Panel>
    );
};

PanelLeftDesktop.displayName = "PanelLeftDesktop";

export default PanelLeftDesktop;
