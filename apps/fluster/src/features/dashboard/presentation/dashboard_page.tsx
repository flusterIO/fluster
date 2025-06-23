import PanelContainer from "@/components/util/panel_container";
import React, { type ReactNode } from "react";
import SimpleDashboard from "./dashboards/simple";

const DashboardPage = (): ReactNode => {
    return (
        <PanelContainer>
            <SimpleDashboard />
        </PanelContainer>
    );
};

DashboardPage.displayName = "DashboardPage";

export default DashboardPage;
