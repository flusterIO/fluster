export enum ThemeMode {
    light,
    dark,
    system,
}

export const themes = [
    "blue",
    "gray",
    "green",
    "neutral",
    "orange",
    "red",
    "rose",
    "slate",
    "stone",
    "violet",
    "yellow",
    "zinc",
    "fluster",
] as const;

export interface ScaffoldState {
    themeMode: ThemeMode;
    theme: (typeof themes)[number];
}

export const initialScaffoldState: ScaffoldState = {
    themeMode: ThemeMode.system,
    theme: "fluster",
};
