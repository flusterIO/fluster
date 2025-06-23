import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialAiState } from "./initial_ai_state";
import { AiProvider, TextInputType } from "./ai_state";

const slice = createSlice({
    name: "ai",
    initialState: initialAiState,
    reducers: {
        setChatInputType(state, action: PayloadAction<TextInputType>) {
            return {
                ...state,
                aiChatInput: action.payload,
            };
        },
        setAiProvider(state, action: PayloadAction<AiProvider>) {
            return {
                ...state,
                provider: action.payload,
            };
        },
    },
});

export const { setAiProvider, setChatInputType } = slice.actions;

export default slice.reducer;
