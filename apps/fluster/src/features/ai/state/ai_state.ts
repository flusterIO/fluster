export enum AiProvider {
    local,
    remote,
}

export enum TextInputType {
    singleLine = "Text Input",
    multiline = "Multi-line Text",
    editor = "Code Editor",
}

export interface AiState {
    provider: AiProvider;
    aiChatInput: TextInputType;
    embeddingModel: string;
    defaultLanguageModel: string;
    maxTextSplitTokens: number;
}
