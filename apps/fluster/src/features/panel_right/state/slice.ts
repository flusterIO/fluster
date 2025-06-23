import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialPanelRightState } from "./initial_state";

const slice = createSlice({
    name: "panelRight",
    initialState: initialPanelRightState,
    reducers: {
        togglePanelRight(state) {
            state.open = !state.open;
        },
        setPanelRightOpen(state, action: PayloadAction<boolean>) {
            state.open = action.payload;
        },
    },
});

export const { togglePanelRight, setPanelRightOpen } = slice.actions;

export default slice.reducer;
