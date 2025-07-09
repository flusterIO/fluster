export const plotThemes = [
    "plotly",
    "plotly_white",
    "plotly_dark",
    "ggplot2",
    "seaborn",
    "simple_white",
] as const;

export interface PlotState {
    lightTheme: (typeof plotThemes)[number];
    darkTheme: (typeof plotThemes)[number];
}
