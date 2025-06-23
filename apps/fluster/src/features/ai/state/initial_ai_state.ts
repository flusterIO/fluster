import { AiProvider, AiState, TextInputType } from "./ai_state";

export const initialAiState: AiState = {
    provider: AiProvider.local,
    aiChatInput: TextInputType.multiline
};
