import { AiProvider, AiState, TextInputType } from "./ai_state";

const DEFAULT_LANGUAGE_MODEL = "phi3:3.8b-instruct";
const DEFAULT_EMBEDDING_MODEL = "nomic-embed-text:latest";

export const initialAiState: AiState = {
  provider: AiProvider.local,
  aiChatInput: TextInputType.multiline,
  defaultLanguageModel: DEFAULT_LANGUAGE_MODEL,
  embeddingModel: DEFAULT_EMBEDDING_MODEL,
};
