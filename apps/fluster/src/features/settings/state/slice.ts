import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialCoreSettings } from "./initial_core_settings";
import { AppState } from "@/state/initial_state";

const slice = createSlice({
    name: "core",
    initialState: initialCoreSettings,
    reducers: {
        setNotesDirectory(state, action: PayloadAction<string>) {
            return {
                ...state,
                notesDirectory: action.payload,
            };
        },
        applySavedState(state, action: PayloadAction<AppState["core"]>) {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
});

export const { setNotesDirectory, applySavedState } = slice.actions;

export default slice.reducer;
