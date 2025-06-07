import React, { type ReactNode } from "react";
import DesktopSideNavigation from "./desktop_side_navigation";
import { Outlet } from "react-router";
import ToastNotificationList from "#/toast_notification/presentation/toast_notification_list";
import { CommandPaletteProvider } from "#/command_palette/state/command_palette_provider";
import CommandPalette from "#/command_palette/presentation/command_palette";
import ConfirmationModalContainer from "#/confirmation_modal/presentation/confirmation_modal_container";
import PageContainer from "@/components/util/page_container";
import MathjaxScript from "#/math/state/mathjax_script";
import { useDevelopmentLogger } from "@/state/use_development_state_logger";

const DesktopScaffold = (): ReactNode => {
    useDevelopmentLogger();
    return (
        <PageContainer id="main-scaffold">
            <MathjaxScript />
            <DesktopSideNavigation />
            <div className="flex-grow h-full w-full pt-8 overflow-y-auto">
                <Outlet />
            </div>
            <ToastNotificationList />
            <CommandPaletteProvider>
                <CommandPalette />
            </CommandPaletteProvider>
            <ConfirmationModalContainer />
        </PageContainer>
    );
};

DesktopScaffold.displayName = "DesktopScaffold";

export default DesktopScaffold;
