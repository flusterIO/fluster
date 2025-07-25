import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialCoreSettings } from "./initial_core_settings";

const slice = createSlice({
    name: "core",
    initialState: initialCoreSettings,
    reducers: {
        setRespectGitIgnore(state, action: PayloadAction<boolean>) {
            return {
                ...state,
                useGitIgnore: action.payload,
            };
        },
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

export const { setNotesDirectory, savedStateApplied, setRespectGitIgnore } =
    slice.actions;

export default slice.reducer;
