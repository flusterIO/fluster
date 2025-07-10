import React, { useMemo, type ReactNode } from "react";
import {
    AxisData,
    GeneralPlotProps,
    MathFunction,
    MathFunctionXDependent,
} from "../../../../types/plot_types";
import { PlotContainer } from "../../../plot_container/index";
import Plot, { PlotParams } from "react-plotly.js";
import { useAxisData } from "../../../../state/hooks/use_axis_data";
import { useAxisDataWithXInput } from "../../../../state/hooks/use_axis_data_with_inputs";
import { sharedLayoutProps } from "../../../../data/shared_data/shared_layout_props";
import { sharedPlotConfig } from "../../../../data/shared_data/shared_plot_config";
import { usePlot } from "../../../../state/hooks/use_plot";
import { useMainPanelSize } from "@fluster.io/dev";
import { useDarkMode } from "@/hooks/use_dark_mode";

export interface ScatterPlotProps extends GeneralPlotProps {
    x: AxisData<MathFunction, number[]>;
    y: AxisData<MathFunctionXDependent, number[]>;
}

export const ScatterPlot = (props: ScatterPlotProps): ReactNode => {
    const x = useAxisData(props.x);
    const y = useAxisDataWithXInput(props.y, x);
    const mainPanelSize = useMainPanelSize();
    const darkMode = useDarkMode();
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
                /* template: props.darkMode */
                /*     ? props.plotProps.darkTheme */
                /*     : props.plotProps.lightTheme, */
            },
            config: sharedPlotConfig,
            style: {
                width: "100%",
                height: "auto",
            },
            useResizeHandler: true,
        } satisfies PlotParams;
    }, [x, y, mainPanelSize, darkMode]);
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
