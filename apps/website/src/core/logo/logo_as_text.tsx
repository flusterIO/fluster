"use client";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { cn } from "../utils/cn";

interface LogoAsTextProps {
    fontSize?: number | "h1";
    className?: string;
    absolute?: boolean;
}

export const LogoAsText = ({
    fontSize = 16,
    absolute = false,
    className,
}: LogoAsTextProps) => {
    const bp = useMediaQuery({
        minWidth: 1024,
    });
    if (fontSize === "h1") {
        fontSize = bp ? 48 : 36;
    }
    return (
        <span
            className={cn(
                "group/logoAsText relative inline-block w-fit h-fit overflow-visible leading-none font-semibold",
                absolute && "beAbsolute",
                className
            )}
        >
            <span
                className={
                    "text-primary !inline-block group-[.beAbsolute]/logoAsText:absolute group-[.beAbsolute]/logoAsText:!translate-y-0"
                }
                style={{
                    transform: `translateY(${fontSize * 0.15}px)`,
                    fontSize: `${fontSize * 1.5}px`,
                }}
            >
                F
            </span>
            <span
                className={
                    "inline-block text-foreground group-[.beAbsolute]/logoAsText:pl-[36%]"
                }
                style={{
                    fontSize: `${fontSize}px`,
                }}
            >
                luster
            </span>
        </span>
    );
};

LogoAsText.displayName = "LogoAsText";

export default LogoAsText;
