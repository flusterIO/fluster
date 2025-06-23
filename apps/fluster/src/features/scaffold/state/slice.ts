import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialScaffoldState, ThemeMode, themes } from "./initial_state";

const scaffoldSlice = createSlice({
  name: "scaffold",
  initialState: initialScaffoldState,
  reducers: {
    setThemeMode(state, action: PayloadAction<ThemeMode>) {
      state.themeMode = action.payload;
    },
    setTheme(state, action: PayloadAction<(typeof themes)[number]>) {
      state.theme = action.payload;
    },
  },
});

export const { setThemeMode: setThemeModeAction, setTheme: setThemeAction } =
  scaffoldSlice.actions;

export default scaffoldSlice.reducer;
