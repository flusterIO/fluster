import type { themes } from "@fluster.io/dev";
import { setThemeAction } from "../slice";
import store from "@/state/store";

export const setTheme = (newTheme: (typeof themes)[number]) => {
    document.body.setAttribute("data-fluster-theme", newTheme);
    store.dispatch(setThemeAction(newTheme));
};
