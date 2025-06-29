import React, { HTMLProps, type ReactNode } from "react";
import { cn } from "../../../utils/cn";

interface GridItemProps extends HTMLProps<HTMLDivElement> {
    children: ReactNode;
    border?: boolean;
    center?: boolean;
}

export const GridItem = ({
    children,
    border,
    center,
    ...props
}: GridItemProps): ReactNode => {
    return (
        <div
            {...props}
            className={cn(
                "w-full h-full",
                border && "border rounded",
                center && "flex flex-col justify-center items-center",
                props.className
            )}
        >
            {children}
        </div>
    );
};

GridItem.displayName = "GridItem";
