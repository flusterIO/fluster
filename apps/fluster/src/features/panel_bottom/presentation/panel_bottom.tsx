import React, { type ReactNode } from "react";
import { Panel } from "react-resizable-panels";

interface PanelBottomProps { }

const PanelBottom = (props: PanelBottomProps): ReactNode => {
    return <Panel defaultSize={200}>Bottom panel</Panel>;
};

PanelBottom.displayName = "PanelBottom";

export default PanelBottom;
