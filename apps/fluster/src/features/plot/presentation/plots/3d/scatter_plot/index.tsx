import React, { type ReactNode } from "react";
import { LinePlot3d, LinePlot3dProps } from "../line_plot";

export interface MarkerProps {
    size?: number;
    opacity?: number;
}

export type ScatterPlot3dProps = LinePlot3dProps & {
    marker: MarkerProps;
};

export const ScatterPlot3d = (props: ScatterPlot3dProps): ReactNode => {
    return <LinePlot3d {...props} scatterPlot />;
};

ScatterPlot3d.displayName = "ScatterPlot3d";
