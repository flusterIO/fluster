import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialCoreSettings } from "./initial_core_settings";

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
        savedStateApplied(state) {
            return {
                ...state,
                hasLoadedSavedState: true,
            };
        },
    },
});

export const { setNotesDirectory, savedStateApplied } = slice.actions;

export default slice.reducer;
