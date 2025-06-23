import React, { type ReactNode } from "react";
import { getColorProp } from "../../../utils/get_color_prop";

interface UlProps {
    children: ReactNode;
}

export const Ul = ({ children, ...props }: UlProps): ReactNode => {
    const colors = getColorProp(props, "primary");
    return (
        <span
            className="underline underline-offset-2"
            style={{
                textDecorationColor: colors.color,
            }}
        >
            {children}
        </span>
    );
};

Ul.displayName = "Ul";
