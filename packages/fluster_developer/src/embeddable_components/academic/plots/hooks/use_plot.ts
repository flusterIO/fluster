import { useEffect, useRef } from "react";
import Plot from "react-plotly.js";
import { useEventListener } from "../../../../hooks/use_event_listener";
import { GeneralPlotProps } from "../types/plot_types";
import { usePlotsDispatch } from "../utils/plots_provider/context";
import { useIsomorphicLayoutEffect } from "../../../../hooks/use_isomorphic_effect";

export const usePlot = (props: GeneralPlotProps) => {
    const ref = useRef<Plot>(null!);
    const dispatch = usePlotsDispatch();

    useEventListener("main-panel-resize", () => {
        // ref.current.forceUpdate();
        ref.current.render();
    });

    useEffect(() => {
        console.log("props: ", props);
        if (props.id) {
            console.log(`Appending...`);
            dispatch({
                type: "appendPlotId",
                payload: {
                    plotId: props.id,
                },
            });
        }
    }, [props]);

    return ref;
};
