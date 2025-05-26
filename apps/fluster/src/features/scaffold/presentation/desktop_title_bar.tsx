import { type ReactNode } from "react";

const DesktopTitleBar = (): ReactNode => {
    return (
        <div
            className="h-8 w-screen top-0 left-0 right-0 fixed bg-[hsl(var(--card))]"
            data-tauri-drag-region
        />
    );
};

DesktopTitleBar.displayName = "DesktopTitleBar";

export default DesktopTitleBar;
