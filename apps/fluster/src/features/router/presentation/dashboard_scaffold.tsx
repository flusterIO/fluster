import React, { type ReactNode } from "react";
import { Outlet } from "react-router";

export const DashboardScaffold = (): ReactNode => {
    return (
        <div>
            <h3>Desktop scaffold</h3>
            <Outlet />
        </div>
    );
};

DashboardScaffold.displayName = "DesktopScaffold";
