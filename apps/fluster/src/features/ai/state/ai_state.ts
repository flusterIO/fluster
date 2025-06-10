export enum AiProvider {
  ollama = "ollama",
}

export interface AiState {
  provider: AiProvider;
}
