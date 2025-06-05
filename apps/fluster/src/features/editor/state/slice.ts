import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialCodeState } from "./initial_state";
import { BundledLanguage, BundledTheme } from "shiki";

const slice = createSlice({
  name: "code",
  initialState: initialCodeState,
  reducers: {
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

export const { setCodeTheme, setDefaultLanguage } = slice.actions;

export default slice.reducer;
