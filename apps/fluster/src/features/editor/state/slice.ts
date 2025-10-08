import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialCodeState } from "./initial_state";
import { BundledLanguage, BundledTheme } from "shiki";
import { AppState } from "@/state/initial_state";
import { JupyterConfigState } from "./code_state";
import { Payload } from "recharts/types/component/DefaultLegendContent";

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
        setJupyterState(state, action: PayloadAction<Partial<JupyterConfigState>>) {
            return {
                ...state,
                jupyter: {
                    ...state.jupyter,
                    ...action.payload,
                },
            };
        },
        setPreviewDebounce(state, action: PayloadAction<number>) {
            return {
                ...state,
                previewDebounce: action.payload,
            };
        },
    },
});

export const {
    setCodeTheme,
    setDefaultLanguage,
    setEditorKeymap,
    setJupyterState,
    setPreviewDebounce,
} = slice.actions;

export default slice.reducer;
