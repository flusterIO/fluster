import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FeatureContainerProps } from "./types";
import clsx from "clsx";

interface FeatureContainerDisplayProps
    extends Pick<FeatureContainerProps, "orientation" | "component"> {
    displayExpand?: boolean;
    containerClasses?: string;
    shouldShow: boolean;
    delay?: number;
}

const FeatureContainerDisplay = ({
    component,
    orientation,
    displayExpand,
    containerClasses,
    shouldShow,
    delay = 0,
}: FeatureContainerDisplayProps) => {
    const scope = useRef<HTMLDivElement>(null!);
    const Component = component;

    return (
        <motion.div
            className={clsx(
                "relative w-full max-h-[60vh] md:h-full flex flex-col justify-center items-center origin-center py-8 flex-grow",
                displayExpand && "h-full",
                containerClasses,
            )}
            ref={scope}
            variants={{
                show: {
                    scale: 1,
                    opacity: 1,
                    x: 0,
                    transition: {
                        type: "spring",
                        stiffness: 100,
                        delay,
                    },
                },
                hide: {
                    scale: 0,
                    opacity: 0,
                    y: orientation === "ltr" ? 200 : -200,
                    transition: {
                        /* delay: 0.5, */
                        type: "spring",
                        stiffness: 100,
                    },
                },
                initial: {
                    scale: 0,
                    opacity: 0,
                    x: orientation === "ltr" ? 200 : -200,
                },
            }}
            initial={"initial"}
            animate={shouldShow ? "show" : "hide"}
        >
            <Component orientation={orientation} shouldShow={shouldShow} />
        </motion.div>
    );
};

FeatureContainerDisplay.displayName = "FeatureContainerDisplay";

export default FeatureContainerDisplay;
