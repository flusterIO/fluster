use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Type, strum_macros::Display)]
pub enum CrossLanguageEvents {
    #[serde(rename = "embedding-model-download-progress")]
    EmbeddingModelDownloadProgress,
    #[serde(rename = "language-model-download-progress")]
    LanguageModelDownloadProgress,
    #[serde(rename = "ai-chat-message-update")]
    AiChatMessageUpdate,
}
