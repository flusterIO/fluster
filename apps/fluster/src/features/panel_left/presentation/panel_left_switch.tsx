import React, { type ReactNode } from "react";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";
import { useMatch } from "react-router";
import { AppRoutes } from "#/router/data/app_routes";
import AddSnippetPanel from "#/snippets/presentation/add_snippet_panel/add_snippet_panel";

const connector = connect((state: AppState, props: any) => ({
    state: state.panelLeft,
    props: props,
}));

interface PanelLeftSwitchProps {
    state: AppState["panelLeft"];
}

const PanelLeftSwitch = connector((props: PanelLeftSwitchProps): ReactNode => {
    const isSnippet = useMatch(AppRoutes.snippets);
    if (isSnippet) {
        return <AddSnippetPanel />;
    }
    return <div>Panel Left Switch</div>;
});

PanelLeftSwitch.displayName = "PanelLeftSwitch";

export default PanelLeftSwitch;
