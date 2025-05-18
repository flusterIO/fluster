import { createSlice } from "@reduxjs/toolkit";
import { initialPanelLeftState } from "./initial_state";

const slice = createSlice({
  name: "panelLeft",
  initialState: initialPanelLeftState,
  reducers: {
    togglePanelLeft(state) {
      state.open = !state.open;
    },
  },
});

export const { togglePanelLeft } = slice.actions;

export default slice.reducer;
