import React, { useMemo, type ReactNode } from "react";
import { useMdxContainerSize } from "../../../hooks/use_mdx_container_size";

export interface ColumnGroup {
  sm?: number;
  md?: number;
  lg?: number;
}

interface ResponsiveGridProps {
  cols: ColumnGroup;
  gap?: string | number;
}

export const ResponsiveGrid = ({
  gap,
  cols,
}: ResponsiveGridProps): ReactNode => {
  const size = useMdxContainerSize();
  const col = useMemo(() => {
    if (!size) {
      return;
    }
    if (size.width > 1080) {
      return cols.lg;
    }

    if (size.width > 768) {
      return cols.md;
    }
    return cols.sm;
  }, [size]);
  return (
    <div
      className="w-full grid"
      style={{
        gap: typeof gap === "number" ? `${gap}px` : gap,
        gridTemplateColumns: col,
      }}
    ></div>
  );
};

ResponsiveGrid.displayName = "ResponsiveGrid";
