import { useEffect, useRef } from "react";
import Plot from "react-plotly.js";
import { useEventListener } from "../../../../hooks/use_event_listener";
import { GeneralPlotProps } from "../types/plot_types";
import { usePlotsDispatch } from "../utils/plots_provider/context";

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
