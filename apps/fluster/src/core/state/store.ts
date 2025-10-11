import { Reducer, combineReducers, configureStore } from "@reduxjs/toolkit";
import ScaffoldReducer from "#/scaffold/state/slice";
import KeymapReducer from "#/keymap/state/slice";
import PanelRightReducer from "#/panel_right/state/slice";
import PanelLeftReducer from "#/panel_left/state/slice";
import PanelBottomReducer from "#/panel_bottom/state/slice";
import CodeReducer from "#/editor/state/slice";
import CoreReducer from "#/settings/state/slice";
import BibReducer from "#/bibliography/state/slice";
import AiReducer from "#/ai/state/slice";
import PlotReducer from "#/plot/state/slice";
import SearchReducer from "#/search/state/slice";
import WhiteboardReducer from "#/whiteboard/state/whiteboard_slice";
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
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const reducers: Record<keyof AppState, Reducer> = {
    ai: AiReducer,
    scaffold: ScaffoldReducer,
    keymap: KeymapReducer,
    panelLeft: PanelLeftReducer,
    panelRight: PanelRightReducer,
    panelBottom: PanelBottomReducer,
    code: CodeReducer,
    core: CoreReducer,
    bib: BibReducer,
    plot: PlotReducer,
    search: SearchReducer,
    whiteboard: WhiteboardReducer,
};

const rootReducer = combineReducers(reducers);

const persistConfig: PersistConfig<AppState> = {
    key: "root",
    storage: stateStorage,
    blacklist: ["core.syncing"],
    stateReconciler: autoMergeLevel2,
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
