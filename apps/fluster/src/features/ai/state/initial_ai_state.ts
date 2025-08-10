import { AiProvider, AiState, TextInputType } from "./ai_state";

const DEFAULT_LANGUAGE_MODEL = "phi3:3.8b-instruct";

export const initialAiState: AiState = {
    provider: AiProvider.local,
    aiChatInput: TextInputType.multiline,
    defaultLanguageModel: DEFAULT_LANGUAGE_MODEL,
};
