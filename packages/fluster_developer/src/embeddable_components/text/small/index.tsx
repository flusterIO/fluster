import React, { type ReactNode } from "react";
import { getColorProp } from "../../../utils/get_color_prop";
import { cn } from "../../../utils/cn";

interface SmallProps {
    children: ReactNode;
}

export const Small = ({ children, ...props }: SmallProps): ReactNode => {
    const color = getColorProp(props, "foreground");
    return (
        <span
            className={cn("text-sm override-colors")}
            style={{
                color: color.color,
            }}
        >
            {children}
        </span>
    );
};

Small.displayName = "Small";
