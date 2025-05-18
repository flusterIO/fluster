import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { initialToastState } from "./initial_toast_state";
import { ToastItem } from "./toast_state";

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

    removeToastById(state, action: PayloadAction<string>) {
      let newToasts = state.toasts.filter(
        (f: (typeof state.toasts)[number]) => f.id !== action.payload,
      );
      state.toasts = newToasts;
    },
  },
});

export const { showToast, removeToastById } = slice.actions;

export default slice.reducer;
