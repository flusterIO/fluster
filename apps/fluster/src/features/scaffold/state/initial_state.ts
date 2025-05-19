export enum ThemeMode {
    light,
    dark,
    system,
}

export interface ScaffoldState {
    themeMode: ThemeMode;
}

export const initialScaffoldState: ScaffoldState = {
    themeMode: ThemeMode.system,
};
