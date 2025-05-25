import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialCodeState } from "./initial_state";

const slice = createSlice({
    name: "code",
    initialState: initialCodeState,
    reducers: {
        setCodeTheme(
            state,
            action: PayloadAction<{
                themeMode: "light" | "dark";
                value: string;
            }>
        ) {
            state.theme[action.payload.themeMode] = action.payload.value;
        },
    },
});

export const { setCodeTheme } = slice.actions;

export default slice.reducer;
