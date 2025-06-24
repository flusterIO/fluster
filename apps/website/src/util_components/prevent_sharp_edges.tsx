"use client";
import { cn } from "#/core/utils/cn";
import React from "react";

interface PreventSharpEdgesProps {
    className?: string;
    tight?: boolean;
    tighter?: boolean;
}

const PreventSharpEdges = ({
    className,
    tight,
    tighter,
}: PreventSharpEdgesProps) => {
    return (
        <div
            className={cn(
                "absolute top-0 left-0 z-10 pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,hsl(var(--background)))]",
                tight &&
                "[mask-image:radial-gradient(ellipse_at_center,transparent_5%,hsl(var(--background)))]",
                tighter &&
                "[mask-image:radial-gradient(ellipse_at_center,transparent_20%,hsl(var(--background))70%)]",
                className
            )}
        />
    );
};

PreventSharpEdges.displayName = "PreventSharpEdges";

export default PreventSharpEdges;
