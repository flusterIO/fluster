import { NavigationItem, NavItemPosition } from "../navigation_item";
import * as icons from "@tabler/icons-react";

export const globalNavigationItems = (): NavigationItem[] => {
    return [
        new NavigationItem(
            "Dashboard",
            "/dashboard",
            icons.IconDashboard,
            NavItemPosition.top,
        ),
        new NavigationItem(
            "Settings",
            "/settings",
            icons.IconSettings2,
            NavItemPosition.top,
        ),
        new NavigationItem(
            "Bibliography",
            "/settings",
            icons.IconBook2,
            NavItemPosition.top,
        ),
    ];
};
