import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { initialToastState } from "./initial_toast_state";

const slice = createSlice({
    name: "toast",
    initialState: initialToastState,
    reducers: {
        showToast(state, action: PayloadAction<Omit<ToastItem, "id">>) {
            let newToasts = state.toasts;
            let data: ToastItem = {
                ...action.payload,
                id: uuidv4(),
            };
            newToasts.push(data);
            state.toasts = newToasts;
        },
    },
});

export const { showToast } = slice.actions;

export default slice.reducer;
