"use client";
import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { MapPinIcon } from "lucide-react";
import { ResumeData } from "./resume_data";

interface WorkHistoryItemProps {
    initialDelay: number;
    item: ResumeData["workHistory"][number];
    dir: "left" | "right";
}

const WorkHistoryItem = ({ initialDelay, item, dir }: WorkHistoryItemProps) => {
    const textClass = dir === "right" ? "min-[740px]:text-right" : "text-left";

    const x = dir === "right" ? 100 : -100;

    return (
        <div
            className={clsx(
                "w-full flex flex-col justify-center items-start",
                dir === "right" && "min-[740px]:items-end"
            )}
        >
            <motion.h3
                className={clsx("font-semibold text-lg", textClass)}
                initial={{
                    x,
                    opacity: 0,
                }}
                animate={{
                    x: 0,
                    opacity: 1,
                    transition: {
                        delay: initialDelay,
                    },
                }}
            >
                {item.title}
            </motion.h3>
            <motion.p
                className={clsx("text-sm", textClass)}
                initial={{
                    x,
                    opacity: 0,
                }}
                animate={{
                    x: 0,
                    opacity: 1,
                    transition: {
                        delay: initialDelay + 0.15,
                    },
                }}
            >
                {item.desc}
            </motion.p>
            <motion.div
                className={clsx(
                    "w-fit text-sm text-muted-foreground flex flex-row justify-center items-center gap-2",
                    dir === "right" && "min-[740px]:flex-row-reverse"
                )}
                initial={{
                    x,
                    opacity: 0,
                }}
                animate={{
                    x: 0,
                    opacity: 1,
                    transition: {
                        delay: initialDelay + 0.25,
                    },
                }}
            >
                <MapPinIcon className={"h-4 w-4"} />
                <div className={clsx("w-full", textClass)}>{item.location}</div>
            </motion.div>
        </div>
    );
};

WorkHistoryItem.displayName = "WorkHistoryItem";

export default WorkHistoryItem;
