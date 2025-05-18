import { AppRoutes } from "#/router/data/main_router_routes";
import { NavigationItem, NavItemPosition } from "../navigation_item";

import * as icons from "@tabler/icons-react";
// import {
//     IconHome,
//     IconBook2,
//     IconTextGrammar,
//     IconCode,
//     IconSettings2,
// } from "@tabler/icons-react";

export const globalNavigationItems = (): NavigationItem[] => {
    return [
        new NavigationItem(
            "Dashboard",
            AppRoutes.dashboard,
            icons.IconHome,
            NavItemPosition.top,
        ),
        new NavigationItem(
            "Bibliography",
            AppRoutes.bibliography,
            icons.IconBook2,
            NavItemPosition.top,
        ),
        new NavigationItem(
            "Dictionary",
            AppRoutes.dictionary,
            icons.IconTextGrammar,
            NavItemPosition.top,
        ),
        new NavigationItem(
            "Snippets",
            AppRoutes.snippets,
            icons.IconCode,
            NavItemPosition.top,
        ),
        new NavigationItem(
            "Settings",
            AppRoutes.settings,
            icons.IconSettings2,
            NavItemPosition.bottom,
        ),
    ];
};
