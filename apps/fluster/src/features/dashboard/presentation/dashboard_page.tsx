import React, { type ReactNode } from "react";
import SimpleDashboard from "./dashboards/simple";

import { AppState } from "@/state/initial_state";
import { connect } from "react-redux";
import { Dashboard } from "./dashboards/dashboard/v0_dashboard";

const connector = connect((state: AppState) => ({
    dashboardType: state.core.dashboardType,
}));

const DashboardPage = connector(
    ({
        dashboardType,
    }: {
        dashboardType: AppState["core"]["dashboardType"];
    }): ReactNode => {
        switch (dashboardType) {
            case "dashboard": {
                return <Dashboard />;
            }
            case "simple": {
                return <SimpleDashboard />;
            }
        }
    }
);

DashboardPage.displayName = "DashboardPage";

export default DashboardPage;
