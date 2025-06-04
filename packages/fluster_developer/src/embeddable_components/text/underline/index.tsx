import React, { HTMLProps, type ReactNode } from "react";
import { getColorVariable } from "../../types";

export interface UlProps extends HTMLProps<HTMLSpanElement> {
    /// A valid fluster color variable.
    color: string;
    children: ReactNode;
}

export const Ul = ({ children, color, ...props }: UlProps): ReactNode => {
    /* const props = underlineProps.safeParse(_props); */
    return (
        <span
            {...props}
            style={{
                backgroundColor: getColorVariable(color),
                paddingLeft: "0.2rem",
                paddingRight: "0.2rem",
                borderRadius: "4px",
                ...props.style,
            }}
        >
            {children}
        </span>
    );
};

Ul.displayName = "Ul";
