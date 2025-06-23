import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialCodeState } from "./initial_state";
import { BundledLanguage, BundledTheme } from "shiki";
import { AppState } from "@/state/initial_state";

const slice = createSlice({
    name: "code",
    initialState: initialCodeState,
    reducers: {
        setEditorKeymap(state, action: PayloadAction<AppState["code"]["keymap"]>) {
            return {
                ...state,
                keymap: action.payload,
            };
        },
        setDefaultLanguage(state, action: PayloadAction<BundledLanguage>) {
            return {
                ...state,
                defaultLanguage: action.payload,
            };
        },
        setCodeTheme(
            state,
            action: PayloadAction<{
                themeMode: "light" | "dark";
                value: BundledTheme;
            }>
        ) {
            return {
                ...state,
                theme: {
                    ...state.theme,
                    [action.payload.themeMode]: action.payload.value,
                },
            };
        },
    },
});

export const { setCodeTheme, setDefaultLanguage, setEditorKeymap } =
    slice.actions;

export default slice.reducer;
