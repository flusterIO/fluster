import { createSlice } from "@reduxjs/toolkit";
import { initialPanelBottomState } from "./initial_state";

const slice = createSlice({
  name: "panelBottom",
  initialState: initialPanelBottomState,
  reducers: {
    togglePanelBottom(state) {
      state.open = !state.open;
    },
  },
});

export const { togglePanelBottom } = slice.actions;

export default slice.reducer;
