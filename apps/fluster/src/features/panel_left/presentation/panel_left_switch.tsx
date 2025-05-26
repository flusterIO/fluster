import { type ReactNode } from "react";
import { useMatch } from "react-router";
import { AppRoutes } from "#/router/data/app_routes";
import AddSnippetPanel from "#/snippets/presentation/add_snippet_panel/add_snippet_panel";

const PanelLeftSwitch = (): ReactNode => {
    const isSnippet = useMatch(AppRoutes.snippets);
    if (isSnippet) {
        return <AddSnippetPanel />;
    }
    return <div>Panel Left Switch</div>;
};

PanelLeftSwitch.displayName = "PanelLeftSwitch";

export default PanelLeftSwitch;
