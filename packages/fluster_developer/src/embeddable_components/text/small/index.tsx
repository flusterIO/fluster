import React, { type ReactNode } from "react";
import { getColorProp } from "../../../utils/get_color_prop";
import { cn } from "../../../utils/cn";

interface SmallProps {
    children: ReactNode;
    noMargin?: boolean;
}

export const Small = ({
    children,
    noMargin,
    ...props
}: SmallProps): ReactNode => {
    const color = getColorProp(props, "foreground");
    return (
        <span
            className={cn("text-sm override-colors", noMargin && "my-0")}
            style={{
                color: color.color,
            }}
        >
            {children}
        </span>
    );
};

Small.displayName = "Small";
