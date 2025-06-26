import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialCoreSettings } from "./initial_core_settings";

const slice = createSlice({
  name: "core",
  initialState: initialCoreSettings,
  reducers: {
    setSyncingState(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        syncing: action.payload,
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

export const { setNotesDirectory, savedStateApplied, setSyncingState } =
  slice.actions;

export default slice.reducer;
