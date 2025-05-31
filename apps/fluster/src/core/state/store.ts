import { Reducer, combineReducers, configureStore } from "@reduxjs/toolkit";
import ScaffoldReducer from "#/scaffold/state/slice.ts";
import KeymapReducer from "#/keymap/state/slice.ts";
import PanelRightReducer from "#/panel_right/state/slice.ts";
import PanelLeftReducer from "#/panel_left/state/slice.ts";
import PanelBottomReducer from "#/panel_bottom/state/slice.ts";
import CodeReducer from "#/editor/state/slice.ts";
import { AppState } from "./initial_state";
import { persistReducer, PersistConfig } from "redux-persist";
import { stateStorage } from "./state_storage";
import persistStore from "redux-persist/es/persistStore";

const reducers: Record<keyof AppState, Reducer> = {
    scaffold: ScaffoldReducer,
    keymap: KeymapReducer,
    panelLeft: PanelLeftReducer,
    panelRight: PanelRightReducer,
    panelBottom: PanelBottomReducer,
    code: CodeReducer,
};

const rootReducer = combineReducers(reducers);

const persistConfig: PersistConfig<AppState> = {
    key: "root",
    storage: stateStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

export default store;
