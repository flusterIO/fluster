import { cn } from "#/core/utils/cn";
import React, { type ReactNode } from "react";
import { motion } from "framer-motion";

interface HeroBackgroundProps {
    children: ReactNode;
    containerClassName?: string;
}

export const HeroBackground = (props: HeroBackgroundProps): ReactNode => {
    return (
        <motion.div
            className={cn(
                "relative flex h-[50rem] w-full items-center justify-center bg-background",
                props.containerClassName
            )}
        /*   style={{ */
        /*       WebkitMaskImage: useMotionTemplate` */
        /*   radial-gradient( */
        /*     200px circle at ${mouseX}px ${mouseY}px, */
        /*     black 0%, */
        /*     transparent 100% */
        /*   ) */
        /* `, */
        /*       maskImage: useMotionTemplate` */
        /*   radial-gradient( */
        /*     200px circle at ${mouseX}px ${mouseY}px, */
        /*     black 0%, */
        /*     transparent 100% */
        /*   ) */
        /* `, */
        /*   }} */
        >
            <div
                className={cn(
                    "absolute inset-0",
                    "[background-size:20px_20px]",
                    "[background-image:radial-gradient(#0ba5e9_1px,transparent_1px)]",
                    "dark:[background-image:radial-gradient(#0ba5e9bb_1px,transparent_1px)]"
                )}
            />
            {/* Radial gradient for the container to give a faded look */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)] dark:bg-black"></div>
            {props.children}
        </motion.div>
    );
};

HeroBackground.displayName = "HeroBackground";
