import React, { type ReactNode } from "react";

interface DesktopTitleBarProps { }

const DesktopTitleBar = (props: DesktopTitleBarProps): ReactNode => {
    return (
        <div
            className="h-4 w-screen top-0 left-0 right-0 fixed"
            data-tauri-drag-region
        />
    );
};

DesktopTitleBar.displayName = "DesktopTitleBar";

export default DesktopTitleBar;
