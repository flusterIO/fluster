import { Reducer, configureStore } from "@reduxjs/toolkit";
import ScaffoldReducer from "#/scaffold/state/slice.ts";
import KeymapReducer from "#/keymap/state/slice.ts";
import PanelRightReducer from "#/panel_right/state/slice.ts";
import PanelLeftReducer from "#/panel_left/state/slice.ts";
import PanelBottomReducer from "#/panel_bottom/state/slice.ts";
import CodeReducer from "#/editor/state/slice.ts";
import { AppState } from "./initial_state";

const reducers: Record<keyof AppState, Reducer> = {
    scaffold: ScaffoldReducer,
    keymap: KeymapReducer,
    panelLeft: PanelLeftReducer,
    panelRight: PanelRightReducer,
    panelBottom: PanelBottomReducer,
    code: CodeReducer,
};

const store = configureStore({
    reducer: reducers,
});

export default store;
