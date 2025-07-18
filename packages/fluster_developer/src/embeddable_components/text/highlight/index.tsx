import React, { HTMLProps, type ReactNode } from "react";
import { getColorProp } from "../../../utils/get_color_prop";

export const ComponentName = "Hl";

export interface HlProps extends HTMLProps<HTMLSpanElement> {
    /// A valid fluster color variable.
    color: string;
    children: ReactNode;
}

export const Hl = ({ children, ...props }: HlProps): ReactNode => {
    const colors = getColorProp(props, "primary");
    return (
        <span
            {...props}
            style={{
                backgroundColor: colors.color,
                color: colors.foreground,
                paddingLeft: "0.2rem",
                paddingRight: "0.2rem",
                borderRadius: "4px",
                ...props.style,
            }}
            className="[&_*]:text-inherit"
        >
            {children}
        </span>
    );
};

Hl.displayName = "Hl";
