import { Reducer, configureStore } from "@reduxjs/toolkit";
import ScaffoldReducer from "#/scaffold/state/slice.ts";
import KeymapReducer from "#/keymap/state/slice.ts";
import CommandPaletteReducer from "#/command_palette/state/slice.ts";
import ToastReducer from "#/toast_notification/state/slice.ts";
import { AppState } from "./initial_state";

const reducers: Record<keyof AppState, Reducer> = {
    scaffold: ScaffoldReducer,
    keymap: KeymapReducer,
    commandPalette: CommandPaletteReducer,
    toast: ToastReducer,
};

const store = configureStore({
    reducer: reducers,
});

export default store;
