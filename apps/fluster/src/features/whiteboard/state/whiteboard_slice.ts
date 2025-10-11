import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialWhiteboardState } from "./initial_whiteboard_settings";

const slice = createSlice({
    name: "whiteboard",
    initialState: initialWhiteboardState,
    reducers: {
        setWhiteboardTimeout(state, action: PayloadAction<number>) {
            return {
                ...state,
                whiteboardTimeout: action.payload,
            };
        },
    },
});

export const { setWhiteboardTimeout } = slice.actions;

export default slice.reducer;
