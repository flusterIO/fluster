import { commands } from "@/lib/bindings";
import store from "./store";
import { AppState } from "./initial_state";

export const appStateKey = "appState";

export const saveSettingState = async (): Promise<boolean> => {
    const state = store.getState();
    const res = await commands.saveSettingState(
        JSON.stringify(state),
        appStateKey
    );
    if (res.status === "error") {
        console.error("Could not save settings state.");
        return false;
    }
    return true;
};

export const getSavedSettings = async (): Promise<AppState | null> => {
    const res = await commands.getSettingState(appStateKey);
    if (res.status === "ok") {
        return JSON.parse(res.data) as AppState;
    } else {
        console.error("Could not read saved settings state.");
        await saveSettingState(); // If it doesn't exist it is possibly the user's first time opening this application, and we should try to persist the default initial state.
        return null;
    }
};
