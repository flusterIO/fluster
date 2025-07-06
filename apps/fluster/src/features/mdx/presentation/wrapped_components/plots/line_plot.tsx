import { useDarkMode } from "@/hooks/use_dark_mode";
import { LinePlot, LinePlotProps } from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { InlineMdxContent } from "../../inline_mdx_content";

export const WrappedLinePlot = (
    props: Omit<LinePlotProps, "darkMode" | "InlineMdxContent">
): ReactNode => {
    const darkMode = useDarkMode();
    return (
        <LinePlot
            darkMode={darkMode}
            InlineMdxContent={InlineMdxContent}
            {...props}
        />
    );
};

WrappedLinePlot.displayName = "WrappedLinePlot";
