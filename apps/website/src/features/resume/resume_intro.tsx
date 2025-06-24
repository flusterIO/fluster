"use client";
import React from "react";
import { motion } from "framer-motion";
import { ResumeData } from "./resume_data";

type ResumeIntroProps = Pick<ResumeData, "intro">;

const ResumeIntro = ({ intro }: ResumeIntroProps) => {
    return (
        <motion.div
            className={
                "w-full h-fit bg-secondary text-secondary-foreground p-4 rounded-md border"
            }
            initial={{
                scale: 0,
                opacity: 0,
            }}
            animate={{
                scale: 1,
                opacity: 1,
                transition: {
                    delay: 0.3,
                },
            }}
        >
            <div dangerouslySetInnerHTML={{ __html: intro }} />
        </motion.div>
    );
};

ResumeIntro.displayName = "ResumeIntro";

export default ResumeIntro;
