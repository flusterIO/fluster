import React, { useMemo, type ReactNode } from "react";
import { useMainPanelSize } from "@fluster.io/dev";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";
import { useDarkMode } from "@/hooks/use_dark_mode";
import { usePlotThemes } from "#/plot/state/hooks/use_plot_themes";
import { Layout } from "plotly.js";
import { sharedPlotConfig } from "#/plot/data/shared_data/shared_plot_config";
import { useAxisData } from "#/plot/state/hooks/use_axis_data";
import { useAxisDataWithXInput } from "#/plot/state/hooks/use_axis_data_with_inputs";
import { usePlot } from "#/plot/state/hooks/use_plot";
import {
    GeneralPlotProps,
    AxisData,
    MathFunction,
    MathFunctionXDependent,
    MathFunctionXYDependent,
} from "#/plot/types/plot_types";
import Plot from "react-plotly.js";
import { PlotContainer } from "../../plot_container";
import { useAxisDataWithXYInput } from "#/plot/state/hooks/use_axis_data_with_xy_input";
import { sharedLayoutProps } from "#/plot/data/shared_data/shared_layout_props";

const connector = connect((state: AppState) => ({
    state: state.plot,
}));

export interface SurfacePlotProps extends GeneralPlotProps {
    x: AxisData<MathFunction, number[]>;
    y: AxisData<MathFunctionXDependent, number[]>;
    z: AxisData<MathFunctionXYDependent, number[][]>;
    state: AppState["plot"];
}

export const SurfacePlot = connector((props: SurfacePlotProps): ReactNode => {
    const x = useAxisData(props.x);
    const y = useAxisDataWithXInput(props.y, x);
    const z = useAxisDataWithXYInput(props.z, x, y);
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

    return (
        <PlotContainer title={props.title} desc={props.desc} id={props.id}>
            <Plot
                data={[
                    {
                        title: {
                            text: y?.label ?? undefined,
                        },
                        x: x?.data,
                        y: y?.data,
                        z: z?.data,
                        type: "surface",
                    },
                ]}
                className="rounded-xl"
                layout={layout}
                config={sharedPlotConfig}
                style={{
                    width: "100%",
                    height: "auto",
                }}
                useResizeHandler={true}
                ref={ref}
            />
        </PlotContainer>
    );
});

SurfacePlot.displayName = "SurfacePlot";
