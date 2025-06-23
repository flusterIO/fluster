"use client";
import React from "react";
import { motion } from "framer-motion";

interface ResumeSkillRatingItemProps {
    label: string;
    rating: number;
    index: number;
    initialDelay?: number;
    delayScalar: number;
}

const ResumeSkillRatingItem = ({
    label,
    index,
    rating,
    delayScalar,
    initialDelay = 0,
}: ResumeSkillRatingItemProps) => {
    return (
        <div className={"w-full grid grid-cols-[60px_1fr] gap-2"}>
            <motion.div
                className={
                    "w-[60px] relative h-4 bg-gradient-to-r from-background to-primary"
                }
                initial={{
                    scaleX: 0,
                    transformOrigin: "left",
                }}
                animate={{
                    scaleX: 1,
                    transition: {
                        delay: initialDelay + index * delayScalar,
                    },
                }}
            >
                <div
                    className={"absolute right-0 top-0 h-full bg-background z-10"}
                    style={{
                        width: `${(60 * (10 - rating)) / 10}px`,
                    }}
                />
            </motion.div>
            <div>
                {label.split("").map((l, i) => (
                    <motion.span
                        key={`${index}-letter-${l}`}
                        initial={{
                            opacity: 0,
                            y: -20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: {
                                delay: initialDelay + index * delayScalar + i * 0.05,
                            },
                        }}
                    >
                        {l}
                    </motion.span>
                ))}
            </div>
        </div>
    );
};

ResumeSkillRatingItem.displayName = "ResumeSkillRatingItem";

export default ResumeSkillRatingItem;
