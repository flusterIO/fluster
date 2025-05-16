import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialCommandPaletteState } from "./command_palette_state";

const slice = createSlice({
    name: "command_palette",
    initialState: initialCommandPaletteState,
    reducers: {
        setCommandPaletteOpen(state, action: PayloadAction<boolean | "toggle">) {
            console.log(`Toggling command palette`);
            // if (action.payload === "toggle") {
            //     state.drawer.open = !state.drawer.open;
            // }
            // if (action.payload !== "toggle") {
            //     state.drawer.open = action.payload;
            // }
        },
    },
});

export const { setCommandPaletteOpen } = slice.actions;

export default slice.reducer;
