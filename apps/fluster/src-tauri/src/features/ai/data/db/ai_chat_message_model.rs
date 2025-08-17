use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(
    Debug, Clone, Serialize, Deserialize, PartialEq, Eq, specta::Type, strum_macros::Display,
)]
pub enum AiChatMessageRole {
    #[serde(rename = "User")]
    User,
    #[serde(rename = "Assistant")]
    Assistant,
    #[serde(rename = "System")]
    System,
    #[serde(rename = "Tool")]
    Tool,
}

#[derive(Serialize, Deserialize, Type, Clone, Debug)]
pub struct AiChatMessageModel {
    pub id: String,
    /// The id of the accompanying AiChatModel row.
    pub chat_id: String,
    /// The user's input as the request body.
    pub body: String,
    pub role: AiChatMessageRole,
    /// The stringified unix timestamp of the time the message was sent.
    pub sent_at: String,
}
