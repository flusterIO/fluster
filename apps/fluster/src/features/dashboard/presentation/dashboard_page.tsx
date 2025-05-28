import PanelContainer from "@/components/util/panel_container";
import React, { type ReactNode } from "react";
import { Dashboard } from "./v0_dashboard";

const DashboardPage = (): ReactNode => {
    return (
        <PanelContainer>
            <Dashboard />
        </PanelContainer>
    );
};

DashboardPage.displayName = "DashboardPage";

export default DashboardPage;
