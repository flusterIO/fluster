import { type ReactNode } from "react";
import { usePlotIdIndex } from "../hooks/use_plot_id_index";

interface PlotRefProps {
    id?: string | null;
}

export const PlotRef = (props: PlotRefProps): ReactNode => {
    const index = usePlotIdIndex(props.id);
    if (index === null || !props.id?.length) {
        return null;
    }
    if (index >= 0) {
        return index + 1;
    } else {
        return null;
    }
};

PlotRef.displayName = "PlotRef";
