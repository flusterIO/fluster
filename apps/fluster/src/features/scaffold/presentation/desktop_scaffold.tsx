import { type ReactNode } from "react";
import DesktopSideNavigation from "./desktop_side_navigation";
import { Outlet } from "react-router";
import DesktopTitleBar from "./desktop_title_bar";
import ToastNotificationList from "#/toast_notification/presentation/toast_notification_list";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";
import { ThemeMode } from "../state/initial_state";
import clsx from "clsx";
import { CommandPaletteProvider } from "#/command_palette/state/command_palette_provider";
import CommandPalette from "#/command_palette/presentation/command_palette";
import { prefersDarkMode } from "../utils";

const connector = connect((state: AppState, props: any) => ({
    themeMode: state.scaffold.themeMode,
    theme: state.scaffold.theme,
    props: props,
}));

const DesktopScaffold = connector(
    ({
        themeMode,
        theme,
    }: {
        themeMode: ThemeMode;
        theme: AppState["scaffold"]["theme"];
    }): ReactNode => {
        return (
            <div
                id="main-scaffold"
                data-fluster-theme={theme}
                className={clsx(
                    "h-full w-full flex flex-row justify-center items-center relative  bg-background text-foreground no-scrollbar-all",
                    (themeMode === ThemeMode.dark ||
                        (themeMode === ThemeMode.system && prefersDarkMode())) &&
                    "dark",
                )}
            >
                <DesktopTitleBar />
                <DesktopSideNavigation />
                <div className="flex-grow h-full w-full pt-8">
                    <Outlet />
                </div>
                <ToastNotificationList />
                <CommandPaletteProvider>
                    <CommandPalette />
                </CommandPaletteProvider>
            </div>
        );
    },
);

DesktopScaffold.displayName = "DesktopScaffold";

export default DesktopScaffold;
