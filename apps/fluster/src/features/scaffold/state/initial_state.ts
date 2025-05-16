import { type NavigationItem } from "../presentation/desktop_side_navigation";

export enum ThemeMode {
    light,
    dark,
    system,
}

export interface ScaffoldState {
    sideNavButtons: NavigationItem[];
    themeMode: ThemeMode;
}

export const initialScaffoldState: ScaffoldState = {
    sideNavButtons: [],
    themeMode: ThemeMode.system,
};
