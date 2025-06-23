import React, { type ReactNode } from "react";
import SimpleDashboardInput from "./simple_dashboard_input";
import { dashboardStaticData } from "#/dashboard/data/models/dashboard_static_data";
import SimpleDashboardAction from "./simple_dashboard_action";

const SimpleDashboard = (): ReactNode => {
    return (
        <div className="@container/simple_dashboard w-full h-[calc(100vh-6rem)] flex flex-col justify-center items-center gap-12 overflow-y-auto">
            <div className="w-[min(90%,540px)] flex flex-col justify-center items-center gap-12 pt-[40vh] @[540px]/simple_dashboard:pt-0 pb-16">
                <div className="w-full flex flex-col justify-center items-center gap-2">
                    <SimpleDashboardInput />
                    <div className="text-sm text-muted-foreground">
                        Use cmd+p to open the command palette
                    </div>
                </div>
                <div className="w-full grid @[540px]/simple_dashboard:grid-cols-2 @[768px]/simple_dashboard:grid-cols-3 gap-4">
                    {dashboardStaticData.quickCreateItems.map((c) => {
                        return <SimpleDashboardAction key={c.id} item={c} />;
                    })}
                </div>
            </div>
        </div>
    );
};

SimpleDashboard.displayName = "SimpleDashboard";

export default SimpleDashboard;
