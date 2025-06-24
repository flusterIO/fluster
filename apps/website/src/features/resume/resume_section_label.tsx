"use client";
import clsx from "clsx";
import { motion } from "framer-motion";
import React, { ReactNode } from "react";

interface ResumeSectionLabelProps {
    children: ReactNode;
    dir: "left" | "right";
    delay: number;
}

const labelHeight = 40;

const ResumeSectionLabel = ({
    children,
    dir,
    delay,
}: ResumeSectionLabelProps) => {
    const heightRatio = (labelHeight - 1.5) / Math.SQRT2;

    return (
        <>
            <motion.h2
                className={"text-2xl font-bold min-[740px]:hidden"}
                initial={{
                    x: -100,
                    opacity: 0,
                }}
                animate={{
                    x: 0,
                    opacity: 1,
                    transition: {
                        delay,
                        bounce: 0,
                    },
                }}
            >
                {children}
            </motion.h2>
            <motion.div
                className={
                    "w-fit overflow-x-visible hidden min-[740px]:inline-block relative border-2 border-primary bg-primary px-4 z-[1] select-none"
                }
                style={{
                    height: `${labelHeight}px`,
                }}
                initial={{
                    x: dir === "right" ? -500 : 500,
                    opacity: 0,
                }}
                animate={{
                    x: 0,
                    opacity: 1,
                    transition: {
                        delay,
                        bounce: 0,
                    },
                }}
            >
                <div
                    className={
                        "w-full h-full flex justify-center items-center z-10 bg-primary"
                    }
                >
                    {children}
                </div>
                <div
                    className={clsx("absolute top-[4.5px] rotate-45 bg-primary z-[-1]")}
                    style={{
                        height: `${heightRatio}px`,
                        width: `${heightRatio}px`,
                        ...(dir === "right"
                            ? {
                                right: `-14px`,
                            }
                            : {
                                left: `-14px`,
                            }),
                    }}
                />
            </motion.div>
        </>
    );
};

ResumeSectionLabel.displayName = "ResumeSectionLabel";

export default ResumeSectionLabel;
