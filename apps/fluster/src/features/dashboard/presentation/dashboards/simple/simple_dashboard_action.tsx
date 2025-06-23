import { DashboardQuickAction } from "#/dashboard/data/models/dashboard_static_data";
import { cn } from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { useNavigate } from "react-router";

interface SimpleDashboardActionProps {
    item: DashboardQuickAction;
}

const SimpleDashboardAction = ({
    item,
}: SimpleDashboardActionProps): ReactNode => {
    const nav = useNavigate();
    return (
        <div
            onClick={() => item.onClick(nav)}
            className="p-6 flex flex-col justify-center items-center gap-4 rounded-lg border w-full hover:bg-muted transition-colors duration-150 cursor-pointer"
        >
            <div className={cn("rounded p-2", item.color)}>
                <item.icon />
            </div>
            <div>{item.label}</div>
        </div>
    );
};

SimpleDashboardAction.displayName = "SimpleDashboardAction";

export default SimpleDashboardAction;
