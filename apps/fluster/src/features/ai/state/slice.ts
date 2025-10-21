import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialAiState } from "./initial_ai_state";
import { AiProvider, TextInputType } from "./ai_state";
import { AiStateSettingSchema } from "#/settings/data/schemas/ai_state_setting_schema";

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
        setAiDefaultProperties(
            state,
            action: PayloadAction<Partial<AiStateSettingSchema>>
        ) {
            return {
                ...state,
                ...action.payload,
                ollamaConnection: {
                    ...state.ollamaConnection,
                    useOllamaConnectionData:
                        action.payload.useOllamaConnection ??
                        state.ollamaConnection.useOllamaConnectionData,
                    port:
                        action.payload.ollamaConnectionPort ?? state.ollamaConnection.port,
                    url: action.payload.ollamaConnectionUrl ?? state.ollamaConnection.url,
                },
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
