import React, { type ReactNode } from "react";
import Plot, { PlotParams } from "react-plotly.js";
import { PlotContainer } from "../plot_container";

interface PlotBareAssProps extends PlotParams {
    title?: string;
    desc?: string;
    id?: string;
}

export const PlotBareAss = ({
    title,
    desc,
    id,
    ...props
}: PlotBareAssProps): ReactNode => {
    return (
        <PlotContainer title={title} desc={desc} id={id}>
            <Plot {...props} />
        </PlotContainer>
    );
};

PlotBareAss.displayName = "PlotBareAss";
