import { PlotlyTheme } from "@/lib/bindings";

export interface PlotState {
    themes: {
        dark: PlotlyTheme;
        light: PlotlyTheme;
    };
}
