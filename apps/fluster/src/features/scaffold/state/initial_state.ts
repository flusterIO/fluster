import { PlotlyTheme } from "@/lib/bindings";
import { themes } from "@fluster.io/dev";

export { themes };
export enum ThemeMode {
    light,
    dark,
    system,
}

export interface PlotState {
    themes: {
        dark: PlotlyTheme;
        light: PlotlyTheme;
    };
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
        themes: {
            dark: "plotly_dark",
            light: "seaborn",
        },
    },
};
