import { createSlice } from "@reduxjs/toolkit";
import { initialPanelRightState } from "./initial_state";

const slice = createSlice({
  name: "panelRight",
  initialState: initialPanelRightState,
  reducers: {
    togglePanelRight(state) {
      state.open = !state.open;
    },
  },
});

export const { togglePanelRight } = slice.actions;

export default slice.reducer;
