import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialPlotState } from "./initial_state";
import { PlotState } from "./plot_state";

const slice = createSlice({
    name: "plot",
    initialState: initialPlotState,
    reducers: {
        setThemes(state, action: PayloadAction<PlotState["themes"]>) {
            return {
                ...state,
                themes: action.payload,
            };
        },
    },
});

export const { setThemes } = slice.actions;

export default slice.reducer;
