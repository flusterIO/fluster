import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialAiState } from "./initial_ai_state";
import { AiProvider } from "./ai_state";

const slice = createSlice({
  name: "ai",
  initialState: initialAiState,
  reducers: {
    setAiProvider(state, action: PayloadAction<AiProvider>) {
      return {
        ...state,
        provider: action.payload,
      };
    },
  },
});

export const { setAiProvider } = slice.actions;

export default slice.reducer;
