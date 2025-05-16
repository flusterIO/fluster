import React, { type ReactNode } from "react";

interface DesktopTitleBarProps { }

const DesktopTitleBar = (props: DesktopTitleBarProps): ReactNode => {
    return (
        <div
            className="h-8 w-screen top-0 left-0 right-0 fixed bg-[hsl(var(--card))]"
            data-tauri-drag-region
        />
    );
};

DesktopTitleBar.displayName = "DesktopTitleBar";

export default DesktopTitleBar;
