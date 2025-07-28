"use client";
import { cn } from "#/core/utils/cn";
import React, { useEffect, useState, type ReactNode } from "react";

interface HeroBackgroundProps {
    children: ReactNode;
    containerClassName?: string;
}

export const HeroBackground = (props: HeroBackgroundProps): ReactNode => {
    const [scrollPortion, setScrollPortion] = useState(1);
    const handleScroll = (): void => {
        setScrollPortion(1 - window.scrollY / window.innerHeight);
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <div
            className={cn(
                "relative flex h-[50rem] w-full items-center justify-center bg-background",
                props.containerClassName
            )}
        >
            <div
                className={cn(
                    "absolute inset-0",
                    "[background-size:20px_20px]",
                    "[background-image:radial-gradient(#0ba5e9bb_1px,transparent_1px)]"
                )}
                style={{
                    opacity: scrollPortion,
                }}
            />
            {/* Radial gradient for the container to give a faded look */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)] bg-background" />
            {props.children}
        </div>
    );
};

HeroBackground.displayName = "HeroBackground";
