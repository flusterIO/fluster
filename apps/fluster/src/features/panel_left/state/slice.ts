import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialPanelLeftState } from "./initial_state";

const slice = createSlice({
    name: "panelLeft",
    initialState: initialPanelLeftState,
    reducers: {
        togglePanelLeft(state) {
            state.open = !state.open;
        },

        setPanelLeftOpen(state, action: PayloadAction<boolean>) {
            state.open = action.payload;
        },
    },
});

export const { togglePanelLeft, setPanelLeftOpen } = slice.actions;

export default slice.reducer;
