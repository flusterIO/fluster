import { useEventListener } from "@fluster.io/dev";
// import Plotly, { redraw, relayout } from "plotly.js";
import { useEffect } from "react";

export const usePlotRedraw = () => {
    const handleResize = (): void => {
        // WITH_WIFI: This was causing a blank white screen. Figure out how to handle this when online again.
        // relayout(document.body);
    };
    useEventListener("main-panel-resize", () => {
        handleResize();
    });

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
};
