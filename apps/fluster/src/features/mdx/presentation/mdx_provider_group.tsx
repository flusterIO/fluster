import { PlotsProvider } from "#/plot/utils/plots_provider/provider";
import React, { type ReactNode } from "react";
import { usePlotRedraw } from "#/plot/state/hooks/use_plot_redraw";
import { TaskManagerTimerHandler } from "#/task_manager/data/task_manager_timer_handler";

interface MdxProviderGroupProps {
    children: ReactNode;
}

export const MdxProviderGroup = ({
    children,
}: MdxProviderGroupProps): ReactNode => {
    usePlotRedraw();
    return (
        <PlotsProvider>
            <TaskManagerTimerHandler />
            {children}
        </PlotsProvider>
    );
};

MdxProviderGroup.displayName = "MdxProviderGroup";
