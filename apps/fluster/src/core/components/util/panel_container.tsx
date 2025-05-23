import { cn } from "@/lib/utils";
import { HTMLProps, type ReactNode } from "react";

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
                "p-6 max-h-full overflow-y-auto no-scrollbar-all",
                className,
            )}
        >
            {children}
        </div>
    );
};

PanelContainer.displayName = "PanelContainer";

export default PanelContainer;
