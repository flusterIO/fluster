import React, { type ReactNode } from "react";

import { ScatterPlot, ScatterPlotProps } from "@fluster.io/dev";
import { useDarkMode } from "@/hooks/use_dark_mode";
import { InlineMdxContent } from "../../inline_mdx_content";

export const WrappedScatterPlot = (
    props: Omit<ScatterPlotProps, "darkMode" | "InlineMdxContent">
): ReactNode => {
    const darkMode = useDarkMode();
    return (
        <ScatterPlot
            darkMode={darkMode}
            InlineMdxContent={InlineMdxContent}
            {...props}
        />
    );
};

WrappedScatterPlot.displayName = "WrappedScatterPlot";
