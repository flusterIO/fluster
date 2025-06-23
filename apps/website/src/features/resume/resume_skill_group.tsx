"use client";
import React from "react";
import clsx from "clsx";
import ResumeSkillRatingItem from "./resume_skill_rating";
import { motion } from "framer-motion";
import { ResumeData } from "./resume_data";

interface ResumeSkillsGroupProps {
    data: ResumeData["skills"][string];
    label: string;
    dir: "left" | "right";
    initialDelay?: number;
}

const delayScalar = 0.025;

const ResumeSkillsGroup = ({
    label,
    data,
    dir,
    initialDelay = 0,
}: ResumeSkillsGroupProps) => {
    const isStringArray = Array.isArray(data);
    return (
        <div
            className={clsx(
                "@container/skillsGroup w-full h-fit flex flex-col",
                dir === "right" ? "items-end" : "items-start"
            )}
        >
            <motion.h3
                className={"text-lg font-semibold"}
                initial={{
                    x: dir === "right" ? 200 : -200,
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
                {label}
            </motion.h3>
            <div
                className={clsx(
                    "w-full max-[740px]:mt-4",
                    isStringArray
                        ? "flex flex-row justify-start items-start flex-wrap gap-x-4"
                        : "flex flex-col justify-start items-start @[450px]/skillsGroup:grid @[450px]/skillsGroup:grid-cols-2 gap-x-6"
                )}
            >
                {isStringArray
                    ? data.map((x, index) => {
                        return (
                            <motion.div
                                key={`skill-nr-${x}`}
                                className={"flex flex-row justify-start items-center gap-2"}
                                initial={{
                                    x: dir === "right" ? -100 : 100,
                                    opacity: 0,
                                }}
                                animate={{
                                    x: 0,
                                    opacity: 1,
                                    transition: {
                                        delay: initialDelay + index * delayScalar * 2,
                                    },
                                }}
                            >
                                <div
                                    className={
                                        "w-4 h-4 flex justify-center items-center border border-primary rounded-full"
                                    }
                                >
                                    <div className={"w-1.5 h-1.5 bg-primary rounded-full"} />
                                </div>
                                <div>{x}</div>
                            </motion.div>
                        );
                    })
                    : Object.keys(data).map((x, i) => {
                        return (
                            <ResumeSkillRatingItem
                                key={`skill-${x}`}
                                label={x}
                                rating={data[x]}
                                delayScalar={delayScalar}
                                index={i}
                                initialDelay={initialDelay + 0.2}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

ResumeSkillsGroup.displayName = "ResumeSkillsGroup";

export default ResumeSkillsGroup;
