import { type ReactNode } from "react";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";
import { useMatch } from "react-router";
import { AppRoutes } from "#/router/data/app_routes";
import SnippetsFilterPanel from "./panels/snippets_panel_right";

const connector = connect((state: AppState, props: any) => ({
    state: state.panelRight,
    props: props,
}));

interface PanelRightSwitchProps {
    state: AppState["panelRight"];
}

const PanelRightSwitch = connector(
    (props: PanelRightSwitchProps): ReactNode => {
        const isSnippets = useMatch(AppRoutes.snippets);
        if (isSnippets) {
            return <SnippetsFilterPanel />;
        }
        return <div>Panel right switch</div>;
    },
);

PanelRightSwitch.displayName = "PanelRightSwitch";

export default PanelRightSwitch;
