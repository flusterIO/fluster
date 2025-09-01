import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialAiState } from "./initial_ai_state";
import { AiProvider, AiState, TextInputType } from "./ai_state";

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

        setEmbeddingModel(state, action: PayloadAction<string>) {
            return {
                ...state,
                embeddingModel: action.payload,
            };
        },
        setDefaultLanguageModel(state, action: PayloadAction<string>) {
            return {
                ...state,
                defaultLanguageModel: action.payload,
            };
        },
        setAiDefaultProperties(state, action: PayloadAction<Partial<AiState>>) {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
});

export const {
    setAiProvider,
    setChatInputType,
    setDefaultLanguageModel,
    setEmbeddingModel,
    setAiDefaultProperties,
} = slice.actions;

export default slice.reducer;
