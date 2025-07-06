import React, { useMemo, type ReactNode } from "react";
import { PlotContainer } from "../../plot_container";
import {
    AxisData,
    GeneralPlotProps,
    MathFunction,
    MathFunctionXDependent,
} from "../../types/plot_types";
import Plot, { PlotParams } from "react-plotly.js";
import { useAxisData } from "../../hooks/use_axis_data";
import { useAxisDataWithXInput } from "../../hooks/use_axis_data_with_inputs";
import { useMainPanelSize } from "../../../../../hooks/use_main_panel_size";
import { usePlot } from "../../hooks/use_plot";
import { sharedLayoutProps } from "../../shared_data/shared_layout_props";
import { sharedPlotConfig } from "../../shared_data/shared_plot_config";

export interface ScatterPlotProps extends GeneralPlotProps {
    x: AxisData<MathFunction, number[]>;
    y: AxisData<MathFunctionXDependent, number[]>;
}

export const ScatterPlot = (props: ScatterPlotProps): ReactNode => {
    const x = useAxisData(props.x);
    const y = useAxisDataWithXInput(props.y, x);
    const mainPanelSize = useMainPanelSize();

    const ref = usePlot(props);
    const data: PlotParams | null = useMemo(() => {
        if (!x || !y) {
            return null;
        }
        return {
            data: [
                {
                    title: {
                        text: y.label ?? undefined,
                    },
                    mode: "markers",
                    x: x.data,
                    y: y.data,
                },
            ],
            className: "rounded-xl",
            layout: {
                ...sharedLayoutProps,
                width: Math.min(mainPanelSize?.width ?? 768, 1080),
            },
            config: sharedPlotConfig,
            style: {
                width: "100%",
                height: "auto",
            },
            useResizeHandler: true,
        } satisfies PlotParams;
    }, [x, y, mainPanelSize]);
    if (!data) {
        return null;
    }
    return (
        <PlotContainer
            InlineMdxContent={props.InlineMdxContent}
            title={props.title}
            desc={props.desc}
            id={props.id}
        >
            <Plot {...data} ref={ref} />
        </PlotContainer>
    );
};

ScatterPlot.displayName = "ScatterPlot";
