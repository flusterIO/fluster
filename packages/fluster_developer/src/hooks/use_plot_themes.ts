import { useEffect, useState } from "react";
import { commands, PlotlyTheme } from "../lib/bindings";
import { Template } from "plotly.js";

export const usePlotThemes = (themes: {
    dark: PlotlyTheme;
    light: PlotlyTheme;
}) => {
    const [data, setData] = useState<{
        dark: Template;
        light: Template;
    } | null>(null);
    const getThemes = async (_themes: typeof themes): Promise<void> => {
        const resLight = await commands.getPlotlyTheme(_themes.light);
        const resDark = await commands.getPlotlyTheme(_themes.dark);
        setData({
            dark: JSON.parse(resDark) as Template,
            light: JSON.parse(resLight) as Template,
        });
    };
    useEffect(() => {
        getThemes(themes);
    }, [themes]);
    return data;
};
