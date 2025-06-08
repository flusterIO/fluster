import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialBibliographyState } from "./initial_state";

const slice = createSlice({
    name: "code",
    initialState: initialBibliographyState,
    reducers: {
        setBibPath(state, action: PayloadAction<string>) {
            return {
                ...state,
                bibPath: action.payload,
            };
        },
        setCslPath(state, action: PayloadAction<string>) {
            return {
                ...state,
                cslPath: action.payload,
            };
        },
    },
});

export const { setBibPath, setCslPath } = slice.actions;

export default slice.reducer;
