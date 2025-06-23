"use client";
import React from "react";
import { motion } from "framer-motion";

const maxButtons = 100;

const ResumeColumnZipper = () => {
    return (
        <div
            className={
                "w-full min-h-full h-fit hidden min-[740px]:flex flex-col justify-around items-center gap-1"
            }
        >
            {Array(maxButtons)
                .fill(0)
                .map((_, i) => {
                    return (
                        <motion.div
                            key={`center-dot-${i}`}
                            className={"w-1 h-1 rounded-full"}
                            initial={{
                                backgroundColor: "#020817",
                            }}
                            animate={{
                                backgroundColor: ["#020817", "#0ba5e9", "#1e293b"],
                                transition: {
                                    delay: 1.25 + i * 0.05,
                                    duration: 1,
                                },
                            }}
                        />
                    );
                })}
        </div>
    );
};

ResumeColumnZipper.displayName = "ResumeColumnZipper";

export default ResumeColumnZipper;
