import { Cell, ICellProps } from "@datalayer/jupyter-react";
import React, { type ReactNode } from "react";

export interface JupyterCellProps extends Omit<ICellProps, "type"> {
    content?: string;
    children?: string;
    type?: "markdown" | "code" | "raw";
}

/// Pass in the kernel name from a wrapped component and global state in the fluster package.
export const JupyterCell = (props: JupyterCellProps): ReactNode => {
    return (
        <Cell
            {...props}
            source={
                typeof props.children === "string"
                    ? props.children
                    : props.source ?? props.content
            }
            type={props.type ?? "code"}
        />
    );
};

JupyterCell.displayName = "JupyterCell";
