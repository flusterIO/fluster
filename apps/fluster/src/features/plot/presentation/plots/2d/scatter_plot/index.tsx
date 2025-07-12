import React, { useMemo, type ReactNode } from "react";
import {
  AxisData,
  GeneralPlotProps,
  MathFunction,
  MathFunctionXDependent,
} from "../../../../types/plot_types";
import { PlotContainer } from "../../../plot_container/index";
import Plot from "react-plotly.js";
import { useAxisData } from "../../../../state/hooks/use_axis_data";
import { useAxisDataWithXInput } from "../../../../state/hooks/use_axis_data_with_inputs";
import { sharedPlotConfig } from "../../../../data/shared_data/shared_plot_config";
import { usePlot } from "../../../../state/hooks/use_plot";
import { useMainPanelSize } from "@fluster.io/dev";
import { useDarkMode } from "@/hooks/use_dark_mode";
import { usePlotThemes } from "#/plot/state/hooks/use_plot_themes";
import { Layout } from "plotly.js";

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
  const themes = usePlotThemes();

  const layout = useMemo(() => {
    return {
      ...(themes ? (darkMode ? themes.dark.layout : themes.light.layout) : {}),
      /* ...sharedLayoutProps, */
      template: darkMode ? themes?.dark : themes?.light,
      autosize: false,
      width: Math.min(mainPanelSize?.width ?? 768, 1080),
    } satisfies Partial<Layout>;
    /* eslint-disable-next-line  --  */
  }, [themes, darkMode]);

  if (!x || !y) {
    return null;
  }

  return (
    <PlotContainer title={props.title} desc={props.desc} id={props.id}>
      <Plot
        data={[
          {
            title: {
              text: y.label ?? undefined,
            },
            mode: "markers",
            x: x.data,
            y: y.data,
          },
        ]}
        className="rounded-xl"
        layout={layout}
        config={sharedPlotConfig}
        style={{
          width: "100%",
          height: "auto",
        }}
        ref={ref}
      />
    </PlotContainer>
  );
};

ScatterPlot.displayName = "ScatterPlot";
