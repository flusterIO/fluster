import React, { useEffect, useMemo, type ReactNode } from "react";
import DesktopSideNavigation from "./desktop_side_navigation";
import { Outlet, useLocation } from "react-router";
import ToastNotificationList from "#/toast_notification/presentation/toast_notification_list";
import { CommandPaletteProvider } from "#/command_palette/state/command_palette_provider";
import CommandPalette from "#/command_palette/presentation/command_palette";
import ConfirmationModalContainer from "#/confirmation_modal/presentation/confirmation_modal_container";
import PageContainer from "@/components/util/page_container";
import MathjaxScript from "#/math/state/mathjax_script";
import { useDevelopmentLogger } from "@/state/use_development_state_logger";
import { DarkModeObserver } from "../state/dark_mode_observer";
import { EquationDetailModal } from "#/math/presentation/equation_detail_modal";
import { BibEntryDetailSheet } from "#/bibliography/presentation/bib_entry_detail_pane";
import { BodyPortal } from "@/components/body_portal";
import { AppRoutes } from "@fluster.io/dev";

const DesktopScaffold = (): ReactNode => {
    useDevelopmentLogger();
    const location = useLocation();
    useEffect(() => {
        window.dispatchEvent(
            new CustomEvent("page-navigate", {
                detail: {
                    location: location,
                },
            })
        );
    }, [location]);
    const applyScrollTarget = useMemo(() => {
        return ![AppRoutes.semanticSearch].some((l) =>
            location.pathname.startsWith(l)
        );
    }, [location]);
    return (
        <PageContainer>
            <MathjaxScript />
            <DarkModeObserver />
            <DesktopSideNavigation />
            <div
                id={applyScrollTarget ? "scroll-target" : "scroll-target-outer"}
                className="@container/main-panel flex-grow h-full w-full pt-8 overflow-y-auto"
            >
                <Outlet />
            </div>
            <EquationDetailModal />
            <ToastNotificationList />
            <BodyPortal>
                <BibEntryDetailSheet />
            </BodyPortal>
            <CommandPaletteProvider>
                <CommandPalette />
            </CommandPaletteProvider>
            <ConfirmationModalContainer />
        </PageContainer>
    );
};

DesktopScaffold.displayName = "DesktopScaffold";

export default DesktopScaffold;
