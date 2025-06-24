import React, { ReactNode } from "react";
import ResumeSectionLabel from "./resume_section_label";
import clsx from "clsx";
import ResumeSectionDescription from "./resume_section_description";
import { cn } from "#/core/utils/cn";

interface ResumeSectionProps {
    label: ReactNode;
    dir: "left" | "right";
    children: ReactNode;
    className?: string;
    desc?: string;
    descDelay?: number;
    arrowDelay: number;
}

const ResumeSection = ({
    label,
    dir,
    children,
    desc,
    descDelay = 0,
    arrowDelay = 0,
    className,
}: ResumeSectionProps) => {
    return (
        <div className={"w-full px-4 space-y-6"}>
            <div
                className={clsx(
                    "flex flex-row justify-start",
                    dir === "right"
                        ? "min-[740px]:justify-end min-[740px]:pr-8"
                        : "min-[740px]:pl-8"
                )}
            >
                <ResumeSectionLabel delay={arrowDelay} dir={dir}>
                    {label}
                </ResumeSectionLabel>
            </div>
            {desc && (
                <ResumeSectionDescription desc={desc} dir={dir} delay={descDelay} />
            )}
            <div className={cn("w-full", className)}>{children}</div>
        </div>
    );
};

ResumeSection.displayName = "ResumeSection";

export default ResumeSection;
