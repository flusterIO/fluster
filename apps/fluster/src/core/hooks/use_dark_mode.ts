import { useSelector } from "react-redux";
import { AppState } from "@/state/initial_state";
import { ThemeMode } from "#/scaffold/state/initial_state";
import { prefersDarkMode } from "#/scaffold/utils";

/** Returns true if the current theme is dark. This takes into account the 'system' setting and finds the value currently applied. True if dark, false if light. */
export const useDarkMode = (): boolean => {
    const themeMode = useSelector((state: AppState) => state.scaffold.themeMode);
    switch (themeMode) {
        case ThemeMode.dark:
            return true;
        case ThemeMode.light:
            return false;
        case ThemeMode.system:
            return prefersDarkMode();
        default:
            return prefersDarkMode();
    }
};
