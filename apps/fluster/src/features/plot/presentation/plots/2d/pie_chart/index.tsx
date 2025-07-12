import { usePlot } from "#/plot/state/hooks/use_plot";
import { usePlotThemes } from "#/plot/state/hooks/use_plot_themes";
import { GeneralPlotProps } from "#/plot/types/plot_types";
import { useDarkMode } from "@/hooks/use_dark_mode";
import { useMainPanelSize } from "@fluster.io/dev";
import { Layout, PieData } from "plotly.js";
import React, { useMemo, type ReactNode } from "react";
import Plot from "react-plotly.js";
import { PieChartNoDataWarning } from "./no_data_warning";
import { sharedLayoutProps } from "#/plot/data/shared_data/shared_layout_props";

interface PieChartItem {
    label: string;
    value: number;
}

interface PieChartProps extends GeneralPlotProps {
    data: PieChartItem[];
}

export const PieChart = ({
    data: items = [],
    ...props
}: PieChartProps): ReactNode => {
    const mainPanelSize = useMainPanelSize();
    const darkMode = useDarkMode();
    const ref = usePlot(props);
    const themes = usePlotThemes();
    const layout = useMemo(() => {
        return {
            ...(themes ? (darkMode ? themes.dark.layout : themes.light.layout) : {}),
            ...sharedLayoutProps,
            template: darkMode ? themes?.dark : themes?.light,
            autosize: false,
            width: Math.min(mainPanelSize?.width ?? 768, 1080),
        } satisfies Partial<Layout>;
        /* eslint-disable-next-line  --  */
    }, [themes, darkMode]);
    const data = useMemo(() => {
        const text = [];
        const values = [];
        for (const item of items) {
            text.push(item.label);
            values.push(item.value);
        }
        return {
            type: "pie",
            text,
            labels: text,
            values,
            hole: 5,
        } satisfies Partial<PieData>;
    }, [items]);

    if (!items.length) {
        return <PieChartNoDataWarning />;
    }

    return (
        <div className="w-full h-fit flex flex-col justify-center items-center">
            <Plot data={[data]} layout={layout} ref={ref} />
        </div>
    );
};

PieChart.displayName = "PieChart";
