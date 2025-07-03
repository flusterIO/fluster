import React, { useMemo, type ReactNode } from "react";
import {
    AxisData,
    GeneralPlotProps,
    MathFunction,
    MathFunctionXDependent,
} from "../../types/plot_types";
import { PlotContainer } from "../../plot_container";
import Plot, { PlotParams } from "react-plotly.js";
import { useAxisData } from "../../hooks/use_axis_data";
import { useAxisDataWithXInput } from "../../hooks/use_axis_data_with_inputs";

export interface LinePlotProps extends GeneralPlotProps {
    x: AxisData<MathFunction, number[]>;
    y: AxisData<MathFunctionXDependent, number[]>;
}

export const LinePlotComponent = (props: LinePlotProps): ReactNode => {
    const x = useAxisData(props.x);
    const y = useAxisDataWithXInput(props.y, x);
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
                    x: x.data,
                    y: y.data,
                },
            ],
            className: "rounded-xl",
            layout: {
                autosize: true,
                paper_bgcolor: "hsl(var(--background))",
                plot_bgcolor: "hsl(var(--background))",
                modebar: {
                    remove: [
                        "lasso2d",
                        "select2d",
                        "sendDataToCloud",
                        "zoom2d",
                        "pan2d",
                        "zoomIn2d",
                        "zoomOut2d",
                        "autoScale2d",
                        "resetScale2d",
                        "hoverClosestCartesian",
                        "hoverCompareCartesian",
                        "zoom3d",
                        "pan3d",
                        "orbitRotation",
                        "tableRotation",
                        "handleDrag3d",
                        "resetCameraDefault3d",
                        "resetCameraLastSave3d",
                        "hoverClosest3d",
                        "zoomInGeo",
                        "zoomOutGeo",
                        "resetGeo",
                        "hoverClosestGeo",
                        "hoverClosestGl2d",
                        "hoverClosestPie",
                        "toggleHover",
                        "toImage",
                        "resetViews",
                        "toggleSpikelines",
                        "zoomInMapbox",
                        "zoomOutMapbox",
                        "resetViewMapbox",
                        "togglespikelines",
                        "togglehover",
                        "hovercompare",
                        "hoverclosest",
                        "v1hovermode",
                    ],
                },
            },
            config: {
                watermark: false,
                showEditInChartStudio: false,
                showSendToCloud: false,
                showTips: false,
                showLink: false,
                modeBarButtons: false,
                displayModeBar: false,
            },
        } satisfies PlotParams;
    }, [x, y]);
    if (!data) {
        return null;
    }
    return (
        <PlotContainer
            InlineMdxContent={props.InlineMdxContent}
            title={props.title}
            desc={props.desc}
        >
            <Plot {...data} />
        </PlotContainer>
    );
};

LinePlotComponent.displayName = "LinePlot";
