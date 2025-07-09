import React, { HTMLProps, type ReactNode } from "react";
import { H4 } from "@fluster.io/dev";
import { cn } from "@/lib/utils";

interface SidePanelContainerProps extends HTMLProps<HTMLDivElement> {
    label: string;
    classes?: {
        childContainer?: string;
    };
}

const SidePanelContainer = ({
    children,
    label,
    className,
    classes = {},
    ...props
}: SidePanelContainerProps): ReactNode => {
    return (
        <div
            {...props}
            className={cn(
                "px-0 pt-4 pb-2 flex flex-col justify-center items-center gap-6",
                className
            )}
        >
            <H4 className="w-full">{label}</H4>
            <div
                className={cn(
                    "overflow-y-auto overflow-x-hidden w-full max-w-full flex flex-col justify-center items-center gap-6 px-[0.2rem]",
                    classes.childContainer
                )}
            >
                {children}
            </div>
        </div>
    );
};

SidePanelContainer.displayName = "SidePanelContainer";

export default SidePanelContainer;
