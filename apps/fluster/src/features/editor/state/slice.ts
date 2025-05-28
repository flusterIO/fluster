import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialCodeState } from "./initial_state";
import { BundledTheme } from "shiki";

const slice = createSlice({
  name: "code",
  initialState: initialCodeState,
  reducers: {
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

export const { setCodeTheme } = slice.actions;

export default slice.reducer;
