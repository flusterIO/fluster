import { GeneralPlotProps } from "#/plot/types/plot_types";
import { usePlotsDispatch } from "#/plot/utils/plots_provider/context";
import { useEffect, useRef } from "react";
import Plot from "react-plotly.js";

export const usePlot = (props: GeneralPlotProps) => {
    const ref = useRef<Plot>(null!);
    const dispatch = usePlotsDispatch();

    useEffect(() => {
        if (props.id) {
            dispatch({
                type: "appendPlotId",
                payload: {
                    plotId: props.id,
                },
            });
        }
        /* eslint-disable-next-line  --  */
    }, [props]);

    return ref;
};
