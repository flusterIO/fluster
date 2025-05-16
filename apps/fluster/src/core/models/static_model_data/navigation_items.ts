import { NavigationItem } from "../navigation_item";

export const globalNavigationItems = (): NavigationItem[] => {
    return [
        new NavigationItem("Dashboard", "/dashboard"),
        new NavigationItem("Settings", "/settings"),
    ];
};
