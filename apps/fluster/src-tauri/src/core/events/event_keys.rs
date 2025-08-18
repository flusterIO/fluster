use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Type, strum_macros::Display)]
pub enum CrossLanguageEvents {
    #[serde(rename = "EmbeddingModelDownloadProgress")]
    EmbeddingModelDownloadProgress,
    #[serde(rename = "LanguageModelDownloadProgress")]
    LanguageModelDownloadProgress,
    #[serde(rename = "AiChatMessageUpdate")]
    AiChatMessageUpdate,
}
