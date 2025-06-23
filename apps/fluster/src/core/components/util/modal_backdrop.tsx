import { cn } from "@fluster.io/dev";
import React, { useEffect, type ReactNode } from "react";

interface ModalBackdropProps {
    onClick: () => void;
    children: ReactNode;
    className?: string;
    hide?: boolean;
}

const ModalBackdrop = ({
    onClick,
    children,
    className,
    hide,
}: ModalBackdropProps): ReactNode => {
    const handleKeyPress = (e: KeyboardEvent): void => {
        if (e.key === "Escape") {
            onClick();
        }
    };
    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
        /* eslint-disable-next-line  --  */
    }, []);
    if (hide) {
        return null;
    }
    return (
        <div
            className={cn(
                "w-screen h-screen fixed top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center gap-6 bg-black/30 dark:bg-black/70",
                className
            )}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClick();
            }}
        >
            {children}
        </div>
    );
};

ModalBackdrop.displayName = "ModalBackdrop";

export default ModalBackdrop;
