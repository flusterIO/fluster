import React, { HTMLProps, type ReactNode } from "react";
import { cn } from "../../../utils/cn";

/* TODO: Document this component in the embedded documentation. */

interface CenterProps extends HTMLProps<HTMLDivElement> {
    children: ReactNode;
}

export const Center = ({
    children,
    className,
    ...props
}: CenterProps): ReactNode => {
    return (
        <div
            {...props}
            className={cn(
                "w-full h-full flex flex-col justify-center items-center",
                className
            )}
        >
            {children}
        </div>
    );
};

Center.displayName = "Center";
