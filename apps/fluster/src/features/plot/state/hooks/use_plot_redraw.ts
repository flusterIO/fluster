import { useEventListener } from "@fluster.io/dev";
import Plotly from "plotly.js";
import { useEffect } from "react";

export const usePlotRedraw = () => {
    const handleResize = (): void => {
        // WITH_WIFI: This was causing a blank white screen. Figure out how to handle this when online again.
        // Plotly.redraw(document.body);
    };
    useEventListener("main-panel-resize", () => {
        console.log(`Redrawing plots...`);
        handleResize();
    });
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
};
