import React, { type ReactNode } from "react";
import SimpleDashboard from "./dashboards/simple";

const DashboardPage = (): ReactNode => {
  return <SimpleDashboard />;
};

DashboardPage.displayName = "DashboardPage";

export default DashboardPage;
