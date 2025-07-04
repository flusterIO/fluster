import { useDarkMode } from "@/hooks/use_dark_mode";
import { type ReactNode } from "react";
/* import { InlineMdxContent } from "../../inline_mdx_content"; */

export const WrappedLinePlot =
    (): /* props: Omit<LinePlotProps, "darkMode" | "InlineMdxContent"> */
        ReactNode => {
        const darkMode = useDarkMode();
        console.log("darkMode: ", darkMode);
        return null;
    };

WrappedLinePlot.displayName = "WrappedLinePlot";
