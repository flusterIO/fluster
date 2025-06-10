import store from "@/state/store";
import { setThemeModeAction } from "../slice";
import { ThemeMode } from "../initial_state";
import { AppState } from "@/state/initial_state";
import { prefersDarkMode } from "#/scaffold/utils";

export const toggleDarkMode = () => {
  const currentThemeMode = (store.getState() as AppState).scaffold.themeMode;
  const themeMode =
    currentThemeMode === ThemeMode.system
      ? prefersDarkMode()
        ? ThemeMode.light
        : ThemeMode.dark
      : currentThemeMode === ThemeMode.light
      ? ThemeMode.dark
      : ThemeMode.light;
  document.body.classList[themeMode === ThemeMode.dark ? "add" : "remove"](
    "dark"
  );
  store.dispatch(setThemeModeAction(themeMode));
};
