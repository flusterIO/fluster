import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialScaffoldState, ThemeMode, themes } from "./initial_state";
import { prefersDarkMode } from "../utils";

const scaffoldSlice = createSlice({
    name: "scaffold",
    initialState: initialScaffoldState,
    reducers: {
        toggleDarkMode(state) {
            if (state.themeMode === ThemeMode.system) {
                const isDarkMode = prefersDarkMode();
                console.log("isDarkMode: ", isDarkMode);
                state.themeMode = isDarkMode ? ThemeMode.light : ThemeMode.dark;
            } else {
                state.themeMode =
                    state.themeMode === ThemeMode.dark ? ThemeMode.light : ThemeMode.dark;
            }
            console.log("state.themeMode: ", state.themeMode);
        },

        setThemeMode(state, action: PayloadAction<ThemeMode>) {
            state.themeMode = action.payload;
        },
        setTheme(state, action: PayloadAction<(typeof themes)[number]>) {
            state.theme = action.payload;
        },
    },
});

export const { toggleDarkMode, setThemeMode, setTheme } = scaffoldSlice.actions;

export default scaffoldSlice.reducer;
