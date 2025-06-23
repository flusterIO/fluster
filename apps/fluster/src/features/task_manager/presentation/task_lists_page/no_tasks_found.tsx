import { H2 } from "@/components/typography/typography";
import React, { type ReactNode } from "react";

export const NoTasksFoundBanner = (): ReactNode => {
    return (
        <div className="w-full h-full min-h-[calc(100vh-12rem)] flex flex-col justify-center items-center gap-8">
            <H2>No tasks found.</H2>
        </div>
    );
};

NoTasksFoundBanner.displayName = "NoTasksFoundBanner";
