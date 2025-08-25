import React, { type ReactNode } from "react";
import { ColumnGroup, ResponsiveGrid } from "./responsive_grid";

interface ColumnMinMax {
    min: string | number;
    /// If true, will set columns to auto-fill instead of auto-fit
    autoFill?: boolean;
}

interface GridProps {
    children?: ReactNode | null;
    gap?: string | number;
    cols?: number | ColumnGroup | ColumnMinMax | null;
}

export const Grid = (props: GridProps): ReactNode => {
    if (!props.cols) {
        return null;
    }
    const { children, gap = "16px", cols } = props;
    if (typeof cols === "number") {
        return (
            <div
                className="w-full grid"
                style={{
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    gap: typeof gap === "number" ? `${gap}px` : gap,
                }}
            >
                {children}
            </div>
        );
    }
    if ("min" in cols) {
        if (!["string", "number"].includes(typeof cols.min)) {
            return null;
        }
        return (
            <div
                className="w-full grid"
                style={{
                    gridTemplateColumns: `repeat(${cols.autoFill ? "auto-fill" : "auto-fit"
                        }, minmax(${cols.min}${typeof cols.min === "string" ? "" : "px"
                        }, 1fr))`,
                    gap: typeof gap === "number" ? `${gap}px` : gap,
                }}
            >
                {children}
            </div>
        );
    }
    return <ResponsiveGrid {...props} cols={cols} />;
};

Grid.displayName = "Grid";
