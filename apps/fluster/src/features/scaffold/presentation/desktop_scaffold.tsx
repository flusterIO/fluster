import React, { type ReactNode } from "react";
import DesktopSideNavigation from "./desktop_side_navigation";
import { Outlet } from "react-router";
import DesktopTitleBar from "./desktop_title_bar";

const DesktopScaffold = (): ReactNode => {
    return (
        <div className="h-full w-full flex flex-row justify-center items-center relative  bg-background text-foreground">
            <DesktopTitleBar />
            <DesktopSideNavigation />
            <div className="flex-grow h-full w-full pt-8">
                <Outlet />
            </div>
        </div>
    );
};

DesktopScaffold.displayName = "DesktopScaffold";

export default DesktopScaffold;
