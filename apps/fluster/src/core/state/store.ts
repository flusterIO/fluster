import { Reducer, combineReducers, configureStore } from "@reduxjs/toolkit";
import ScaffoldReducer from "#/scaffold/state/slice";
import KeymapReducer from "#/keymap/state/slice";
import PanelRightReducer from "#/panel_right/state/slice";
import PanelLeftReducer from "#/panel_left/state/slice";
import PanelBottomReducer from "#/panel_bottom/state/slice";
import CodeReducer from "#/editor/state/slice";
import CoreReducer from "#/settings/state/slice";
import BibReducer from "#/bibliography/state/slice";
import { AppState } from "./initial_state";
import {
    persistReducer,
    PersistConfig,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import { stateStorage } from "./state_storage";

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

const rootReducer = combineReducers(reducers);

const persistConfig: PersistConfig<AppState> = {
    key: "root",
    storage: stateStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export default store;
