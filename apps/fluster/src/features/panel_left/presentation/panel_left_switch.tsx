import { type ReactNode } from "react";
import { useRoutes } from "react-router";
import { AppRoutes } from "#/router/data/app_routes";
import AddSnippetPanel from "#/snippets/presentation/add_snippet_panel/add_snippet_panel";
import { AddEquationPanel } from "#/math/presentation/equations_page/add_equation_panel/main";

const PanelLeftSwitch = (): ReactNode => {
    const n = useRoutes([
        {
            path: AppRoutes.snippets,
            Component: AddSnippetPanel,
        },
        {
            path: AppRoutes.equations,
            Component: AddEquationPanel,
        },
    ]);
    return n;
};

PanelLeftSwitch.displayName = "PanelLeftSwitch";

export default PanelLeftSwitch;
