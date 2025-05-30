import { DashboardQuickAction } from "#/dashboard/data/models/dashboard_static_data";
import { cn } from "@fluster.io/dev";
import React, { type ReactNode } from "react";

interface SimpleDashboardActionProps {
  item: DashboardQuickAction;
}

const SimpleDashboardAction = ({
  item,
}: SimpleDashboardActionProps): ReactNode => {
  return (
    <div className="p-6 flex flex-col justify-center items-center gap-4 rounded-lg border">
      <div className={cn("rounded", item.color)}>
        <item.icon />
      </div>
      <div>{item.label}</div>
    </div>
  );
};

SimpleDashboardAction.displayName = "SimpleDashboardAction";

export default SimpleDashboardAction;
