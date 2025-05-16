import React, { type ReactNode } from "react";
import { ResizableBox } from "react-resizable";

interface PanelRightDesktopProps { }

const PanelRightDesktop = (props: PanelRightDesktopProps): ReactNode => {
    return (
        /* @ts-ignore */
        <ResizableBox width={200} axis="x" className="border-l h-full">
            Panel Right
        </ResizableBox>
    );
};

PanelRightDesktop.displayName = "PanelRightDesktop";

export default PanelRightDesktop;
