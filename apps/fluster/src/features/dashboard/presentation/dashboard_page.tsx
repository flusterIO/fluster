import PanelContainer from "@/components/util/panel_container";
import React, { type ReactNode } from "react";

interface DashboardPageProps { }

const DashboardPage = (props: DashboardPageProps): ReactNode => {
    return <PanelContainer>Dashboard Page</PanelContainer>;
};

DashboardPage.displayName = "DashboardPage";

export default DashboardPage;
