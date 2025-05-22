import SidePanelContainer from "@/components/side_panel_container";
import { type ReactNode } from "react";

const SnippetsFilterPanel = (): ReactNode => {
    return <SidePanelContainer label="Filter Snippets"></SidePanelContainer>;
};

SnippetsFilterPanel.displayName = "SnippetsFilterPanel";

export default SnippetsFilterPanel;
