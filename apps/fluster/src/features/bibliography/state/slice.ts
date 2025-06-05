import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialBibliographyState } from "./initial_state";

const slice = createSlice({
  name: "code",
  initialState: initialBibliographyState,
  reducers: {
    setBibPath(state, action: PayloadAction<string>) {
      return {
        ...state,
        bib_path: action.payload,
      };
    },
  },
});

export const { setBibPath } = slice.actions;

export default slice.reducer;
