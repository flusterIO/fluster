import React, { type ReactNode } from "react";
import SimpleDashboardInput from "./simple_dashboard_input";
import { dashboardStaticData } from "#/dashboard/data/models/dashboard_static_data";
import SimpleDashboardAction from "./simple_dashboard_action";

const SimpleDashboard = (): ReactNode => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-12">
      <SimpleDashboardInput />
      <div>
        {dashboardStaticData.quickCreateItems.map((c) => {
          return <SimpleDashboardAction key={c.id} item={c} />;
        })}
      </div>
    </div>
  );
};

SimpleDashboard.displayName = "SimpleDashboard";

export default SimpleDashboard;
