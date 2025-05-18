import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialScaffoldState, ThemeMode } from "./initial_state";

const scaffoldSlice = createSlice({
  name: "scaffold",
  initialState: initialScaffoldState,
  reducers: {
    toggleDarkMode(state) {
      state.themeMode =
        state.themeMode === ThemeMode.dark ? ThemeMode.light : ThemeMode.dark;
    },

    setThemeMode(state, action: PayloadAction<ThemeMode>) {
      state.themeMode = action.payload;
    },
  },
});

export const { toggleDarkMode, setThemeMode } = scaffoldSlice.actions;

export default scaffoldSlice.reducer;
