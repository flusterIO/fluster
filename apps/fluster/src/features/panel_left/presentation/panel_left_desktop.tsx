import React, { type ReactNode } from "react";
import { Resizable, ResizableBox } from "react-resizable";
import PanelLeftSwitch from "./panel_left_switch";

const PanelLeftDesktop = (): ReactNode => {
    return (
        /* @ts-ignore */
        <ResizableBox
            width={200}
            axis="x"
            className="border-r h-full"
            handleSize={[5, 32]}
        /* draggableOpts={{ */
        /*     "" */
        /* }} */
        >
            <PanelLeftSwitch />
        </ResizableBox>
    );
};

PanelLeftDesktop.displayName = "PanelLeftDesktop";

export default PanelLeftDesktop;
