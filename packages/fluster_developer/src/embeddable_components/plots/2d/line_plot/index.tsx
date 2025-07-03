import { type ReactNode } from "react";
import { AxisData, GeneralPlotProps } from "../../types/plot_types";
/* import { PlotContainer } from "../../plot_container"; */
/* import Plot, { PlotParams } from "react-plotly.js"; */

interface LinePlotProps extends GeneralPlotProps {
  x: AxisData;
  y: AxisData;
}

export const LinePlotComponent = (props: LinePlotProps): ReactNode => {
  console.log("props: ", props);
  return null;
  /* const data: PlotParams = { */
  /*     data: , */
  /* }; */
  /* return ( */
  /*     <PlotContainer InlineMdxContent={props.InlineMdxContent} title={props.title} desc={props.desc}> */
  /*         <Plot {...data} /> */
  /*     </PlotContainer> */
  /* ); */
};

LinePlotComponent.displayName = "LinePlot";
