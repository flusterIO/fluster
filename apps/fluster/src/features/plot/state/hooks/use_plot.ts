import { GeneralPlotProps } from "#/plot/types/plot_types";
import { usePlotsDispatch } from "#/plot/utils/plots_provider/context";
import { useEventListener } from "@fluster.io/dev";
import { useEffect, useRef } from "react";
import Plot from "react-plotly.js";

export const usePlot = (props: GeneralPlotProps) => {
    const ref = useRef<Plot>(null!);
    const dispatch = usePlotsDispatch();

    useEventListener("main-panel-resize", () => {
        // ref.current.forceUpdate();
        ref.current.render();
    });

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
