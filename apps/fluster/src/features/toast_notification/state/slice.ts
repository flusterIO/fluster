import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { initialToastState } from "./initial_toast_state";
import { ToastItem } from "./toast_state";

const slice = createSlice({
    name: "toast",
    initialState: initialToastState,
    reducers: {},
});

export const { } = slice.actions;

export default slice.reducer;
