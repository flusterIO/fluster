import React, { type ReactNode } from "react";

export const CalendarPanelRight = (): ReactNode => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="text-center">Select a task to view details here.</div>
        </div>
    );
};

CalendarPanelRight.displayName = "CalendarPanelRight";
