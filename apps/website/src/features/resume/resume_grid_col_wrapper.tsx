import clsx from "clsx";
import React, { ReactNode } from "react";

interface ResumeGridColoumnWrapperProps {
    children: ReactNode;
    className?: string;
}

const ResumeGridColoumnWrapper = ({
    children,
    className,
}: ResumeGridColoumnWrapperProps) => {
    return (
        <div className={clsx("w-full h-full space-y-6", className)}>{children}</div>
    );
};

ResumeGridColoumnWrapper.displayName = "ResumeGridColoumnWrapper";

export default ResumeGridColoumnWrapper;
