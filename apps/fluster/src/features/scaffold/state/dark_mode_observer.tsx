import { useDarkMode } from "@/hooks/use_dark_mode";
import { useIsomorphicLayoutEffect } from "@fluster.io/dev";
import { type ReactNode } from "react";

export const DarkModeObserver = (): ReactNode => {
    const darkMode = useDarkMode();
    useIsomorphicLayoutEffect(() => {
        document.body.classList[darkMode ? "add" : "remove"]("dark");
    }, [darkMode]);
    return null;
};

DarkModeObserver.displayName = "DarkModeObserver";
