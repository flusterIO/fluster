import {themes} from "@fluster.io/dev";
export enum ThemeMode {
    light,
    dark,
    system,
}

export {themes};

export interface ScaffoldState {
    themeMode: ThemeMode;
    theme: (typeof themes)[number];
}

export const initialScaffoldState: ScaffoldState = {
    themeMode: ThemeMode.system,
    theme: "fluster",
};
