import React, { type ReactNode } from "react";
import { ColumnGroup, ResponsiveGrid } from "./responsive_grid";

interface ColumnMinMax {
  min: string | number;
  /// If true, will set columns to auto-fill instead of auto-fit
  autoFill?: boolean;
}

interface GridProps {
  children: ReactNode;
  gap?: string | number;
  cols: number | ColumnGroup | ColumnMinMax;
}

export const Grid = (props: GridProps): ReactNode => {
  const { children, gap = "16px", cols } = props;
  if (typeof cols === "number") {
    return (
      <div
        className="w-full grid"
        style={{
          gridTemplateColumns: cols,
          gap: typeof gap === "number" ? `${gap}px` : gap,
        }}
      >
        {children}
      </div>
    );
  }
  if ("min" in cols) {
    return (
      <div
        className="w-full grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${
            cols.autoFill ? "auto-fill" : "auto-fit"
          }, minmax(${cols.min}${
            typeof cols.min === "string" ? "" : "px"
          }, 1fr))`,
        }}
      >
        {children}
      </div>
    );
  }
  return <ResponsiveGrid {...props} cols={cols} />;
};

Grid.displayName = "Grid";
