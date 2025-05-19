import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialScaffoldState, ThemeMode } from "./initial_state";
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
    },
});

export const { toggleDarkMode, setThemeMode } = scaffoldSlice.actions;

export default scaffoldSlice.reducer;
