import { PlotState, themes } from "@fluster.io/dev";

export { themes };
export enum ThemeMode {
    light,
    dark,
    system,
}

export interface ScaffoldState {
    themeMode: ThemeMode;
    theme: (typeof themes)[number];
    plot: PlotState;
}

export const initialScaffoldState: ScaffoldState = {
    themeMode: ThemeMode.system,
    theme: "fluster",
    plot: {
        darkTheme: "plotly_dark",
        lightTheme: "seaborn",
    },
};
