import {
    Reducer,
    combineReducers,
    configureStore,
    createListenerMiddleware,
} from "@reduxjs/toolkit";
import ScaffoldReducer from "#/scaffold/state/slice";
import KeymapReducer from "#/keymap/state/slice";
import PanelRightReducer from "#/panel_right/state/slice";
import PanelLeftReducer from "#/panel_left/state/slice";
import PanelBottomReducer from "#/panel_bottom/state/slice";
import CodeReducer from "#/editor/state/slice";
import CoreReducer from "#/settings/state/slice";
import BibReducer from "#/bibliography/state/slice";
import { AppState, initialAppState } from "./initial_state";
import { appStateKey, getSavedSettings } from "./state_storage";
import logger from "redux-logger";
import { commands } from "@/lib/bindings";

const reducers: Record<keyof AppState, Reducer> = {
    scaffold: ScaffoldReducer,
    keymap: KeymapReducer,
    panelLeft: PanelLeftReducer,
    panelRight: PanelRightReducer,
    panelBottom: PanelBottomReducer,
    code: CodeReducer,
    core: CoreReducer,
    bib: BibReducer,
};

const saveStateMiddleware = createListenerMiddleware();

const triggerActions = [];

let timer: NodeJS.Timeout | null = null;

saveStateMiddleware.startListening({
    // predicate(action, currentState, originalState): boolean {
    predicate(): boolean {
        return true;
    },
    effect: async (action, listenerApi) => {
        console.log("action: ", action);
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(async () => {
            const res = await commands.saveSettingState(
                JSON.stringify(listenerApi.getState()),
                appStateKey
            );
            if (res.status === "error") {
                console.error(`An error occurred while attempting to save state.`);
            }
            timer = null;
        }, 5000);
    },
});

const rootReducer = combineReducers(reducers);

const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialAppState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger).concat(saveStateMiddleware),
});

export const getStoreWithPreloadedState = async () => {
    const res = await getSavedSettings();
    return configureStore({
        reducer: rootReducer,
        preloadedState: res ?? undefined,
    });
};

export default store;
