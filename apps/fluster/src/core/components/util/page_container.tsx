import React, { HTMLProps, type ReactNode } from "react";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";
import { cn } from "@fluster.io/dev";
import { ThemeMode } from "#/scaffold/state/initial_state";
import { prefersDarkMode } from "#/scaffold/utils";
import DesktopTitleBar from "#/scaffold/presentation/desktop_title_bar";

const connector = connect((state: AppState) => ({
    themeMode: state.scaffold.themeMode,
    theme: state.scaffold.theme,
}));

interface PageContainerProps extends HTMLProps<HTMLDivElement> {
    themeMode: AppState["scaffold"]["themeMode"];
    theme: AppState["scaffold"]["theme"];
}

const PageContainer = connector(
    ({ theme, themeMode, ...props }: PageContainerProps): ReactNode => {
        return (
            <div
                {...props}
                data-fluster-theme={theme}
                className={cn(
                    "h-full w-full flex flex-row justify-center items-center relative  bg-background text-foreground no-scrollbar-all",
                    (themeMode === ThemeMode.dark ||
                        (themeMode === ThemeMode.system && prefersDarkMode())) &&
                    "dark",
                    props.className
                )}
            >
                <DesktopTitleBar />
                {props.children}
            </div>
        );
    }
);

PageContainer.displayName = "PageContainer";

export default PageContainer;
