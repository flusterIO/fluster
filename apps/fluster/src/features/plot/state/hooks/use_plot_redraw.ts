import { useEventListener } from "@fluster.io/dev";
import Plotly from "plotly.js";
import { useEffect } from "react";

export const usePlotRedraw = () => {
    const handleResize = (): void => {
        Plotly.redraw(document.body);
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
