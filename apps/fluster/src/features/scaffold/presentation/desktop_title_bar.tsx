import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { type ReactNode } from "react";

import { AppState } from "@/state/initial_state";
import { connect, useDispatch } from "react-redux";
import { cn } from "@fluster.io/dev";
import { togglePanelLeft } from "#/panel_left/state/slice";
import { togglePanelRight } from "#/panel_right/state/slice";

const connector = connect((state: AppState) => ({
    panelLeftOpen: state.panelLeft.open,
    panelRightOpen: state.panelRight.open,
}));

const DesktopTitleBar = connector(
    ({
        panelLeftOpen,
        panelRightOpen,
    }: {
        panelRightOpen: boolean;
        panelLeftOpen: boolean;
    }): ReactNode => {
        const dispatch = useDispatch();
        return (
            <div
                id="desktop-title-bar"
                className="h-8 w-screen top-0 left-0 right-0 fixed bg-[hsl(var(--card))] flex flex-row justify-end items-center gap-4 px-6"
                data-tauri-drag-region
            >
                <ChevronRight
                    className={cn(
                        "w-3 h-3 cursor-pointer",
                        panelLeftOpen ? "text-foreground" : "text-foreground/70"
                    )}
                    onClick={() => {
                        dispatch(togglePanelLeft());
                    }}
                />
                <ChevronLeft
                    className={cn(
                        "w-3 h-3 cursor-pointer",
                        panelRightOpen ? "text-foreground" : "text-foreground/70"
                    )}
                    onClick={() => {
                        dispatch(togglePanelRight());
                    }}
                />
            </div>
        );
    }
);

DesktopTitleBar.displayName = "DesktopTitleBar";

export default DesktopTitleBar;
