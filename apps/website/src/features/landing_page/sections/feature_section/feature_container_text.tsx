"use client";
import React, { useRef } from "react";
import { FeatureContainerProps } from "./types";
import { motion } from "framer-motion";
import clsx from "clsx";

interface FeatureContainerTextProps
    extends Pick<
        FeatureContainerProps,
        "label" | "desc" | "title" | "orientation"
    > {
    shouldShow: boolean;
    delay?: number;
}

const FeatureContainerText = ({
    label,
    title,
    desc,
    orientation,
    shouldShow,
    delay = 0,
}: FeatureContainerTextProps) => {
    const scope = useRef<HTMLDivElement>(null!);
    const ltr = orientation === "ltr";
    const Desc = desc;
    const Title = title;
    const Label = label;

    return (
        <motion.div
            ref={scope}
            className={
                "w-full min-w-[min(400px,calc(100vw-4rem))] flex flex-col justify-center items-start group-[.feature-active]/feature:z-10"
            }
        >
            <motion.h3
                className={clsx(
                    "feature-animate opacity-0 text-muted-foreground text-2xl font-semibold mt-2"
                    /* ltr ? "translate-x-[-100px]" : "translate-x-[100px]" */
                )}
                variants={{
                    show: {
                        x: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.5,
                            delay,
                        },
                    },
                    hide: {
                        x: ltr ? -100 : 100,
                        opacity: 0,
                        transition: {
                            duration: 0.5,
                        },
                    },
                }}
                initial={"hide"}
                animate={shouldShow ? "show" : "hide"}
            >
                {typeof Label === "function" ? (
                    <Label shouldShow={shouldShow} orientation={orientation} />
                ) : (
                    Label
                )}
            </motion.h3>
            <motion.h2
                className={clsx(
                    "feature-animate opacity-0 text-foreground text-4xl font-bold"
                    /* ltr ? "translate-x-[-10x]" : "translate-x-[100px]" */
                )}
                initial={"hide"}
                animate={shouldShow ? "show" : "hide"}
                variants={{
                    show: {
                        x: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.5,
                            delay: delay + 0.25,
                        },
                    },
                    hide: {
                        x: ltr ? -100 : 100,
                        opacity: 0,
                        transition: {
                            duration: 0.5,
                        },
                    },
                }}
            >
                {typeof Title === "function" ? (
                    <Title orientation={orientation} shouldShow={shouldShow} />
                ) : (
                    Title
                )}
            </motion.h2>
            <motion.div
                className={clsx(
                    "feature-animate opacity-0 origin-center text-foreground text-lg mt-4"
                )}
                animate={shouldShow ? "show" : "hide"}
                initial={"hide"}
                variants={{
                    show: {
                        opacity: 1,
                        scale: 1,
                        transition: {
                            delay: delay + 0.65,
                            duration: 0.5,
                            scale: {
                                duration: 1,
                                type: "spring",
                                stiffness: 100,
                            },
                        },
                    },
                    hide: {
                        opacity: 0,
                        scale: 0,
                        transition: {
                            duration: 0.5,
                            scale: {
                                duration: 1,
                                type: "spring",
                                stiffness: 100,
                            },
                        },
                    },
                }}
            >
                <Desc orientation={orientation} shouldShow={shouldShow} />
            </motion.div>
        </motion.div>
    );
};

FeatureContainerText.displayName = "FeatureContainerText";

export default FeatureContainerText;
