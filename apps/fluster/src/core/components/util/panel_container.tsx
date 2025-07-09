import { cn } from "@/lib/utils";
import React, { HTMLProps, type ReactNode } from "react";

interface PanelContainerProps extends HTMLProps<HTMLDivElement> {
    children: ReactNode;
}

const PanelContainer = ({
    children,
    className,
    ...props
}: PanelContainerProps): ReactNode => {
    return (
        <div
            {...props}
            className={cn(
                "@container/panel p-6 max-h-full no-scrollbar-all flex-grow h-full inline",
                className
            )}
        >
            {children}
        </div>
    );
};

PanelContainer.displayName = "PanelContainer";

export default PanelContainer;
