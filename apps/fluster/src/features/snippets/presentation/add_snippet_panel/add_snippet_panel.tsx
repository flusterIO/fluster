import SidePanelContainer from "@/components/side_panel_container";
import React, { type ReactNode } from "react";

const AddSnippetPanel = (): ReactNode => {
    return <SidePanelContainer label="Add snippet">Here</SidePanelContainer>;
};

AddSnippetPanel.displayName = "AddSnippetPanel";

export default AddSnippetPanel;
