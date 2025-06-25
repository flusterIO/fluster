import React, { HTMLProps, type ReactNode } from "react";
import { cn } from "../../../utils/cn";

interface AbstractProps extends HTMLProps<HTMLDivElement> {
    children: ReactNode;
}

export const Abstract = ({ children, ...props }: AbstractProps): ReactNode => {
    return (
        <div
            {...props}
            className={cn(
                "w-full bg-muted rounded border px-4 py-5",
                props.className
            )}
        >
            {children}
        </div>
    );
};

Abstract.displayName = "Abstract";
