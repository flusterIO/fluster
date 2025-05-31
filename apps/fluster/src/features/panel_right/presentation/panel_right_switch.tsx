import React, { type ReactNode } from "react";
import { useMatch } from "react-router";
import { AppRoutes } from "#/router/data/app_routes";
import SnippetsFilterPanel from "#/snippets/presentation/filter_snippets_panel/filter_snippets_panel";

const PanelRightSwitch = (): ReactNode => {
    const isSnippets = useMatch(AppRoutes.snippets);
    if (isSnippets) {
        return <SnippetsFilterPanel />;
    }
    return <div>Panel right switch</div>;
};

PanelRightSwitch.displayName = "PanelRightSwitch";

export default PanelRightSwitch;
