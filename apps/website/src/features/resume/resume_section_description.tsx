"use client";
import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface ResumeSectionDescriptionProps {
    desc: string;
    dir: "right" | "left";
    delay?: number;
}

const ResumeSectionDescription = ({
    desc,
    dir,
    delay,
}: ResumeSectionDescriptionProps) => {
    return (
        <motion.p
            className={clsx(
                "w-full text-sm text-muted-foreground text-left",
                dir === "right" && "min-[740px]:text-right"
            )}
            initial={{
                opacity: 0,
                x: dir === "right" ? 100 : -100,
            }}
            animate={{
                opacity: 1,
                x: 0,
                transition: {
                    delay: delay,
                },
            }}
        >
            {desc}
        </motion.p>
    );
};

ResumeSectionDescription.displayName = "ResumeSectionDescription";

export default ResumeSectionDescription;
