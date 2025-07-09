import { useDarkMode } from "@/hooks/use_dark_mode";
import { LinePlot, LinePlotProps } from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { InlineMdxContent } from "../../inline_mdx_content";
import { useSelector } from "react-redux";
import { AppState } from "@/state/initial_state";

export const WrappedLinePlot = (
  props: Omit<LinePlotProps, "darkMode" | "InlineMdxContent" | "plotProps">
): ReactNode => {
  const darkMode = useDarkMode();
  const plotProps = useSelector((state: AppState) => state.scaffold.plot);
  return (
    <LinePlot
      darkMode={darkMode}
      InlineMdxContent={InlineMdxContent}
      plotProps={plotProps}
      {...props}
    />
  );
};

WrappedLinePlot.displayName = "WrappedLinePlot";
