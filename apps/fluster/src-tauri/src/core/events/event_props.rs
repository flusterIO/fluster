use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, specta::Type, Clone)]
pub struct AiChatMessageUpdateEventProps {
    /// The id of the entire chat.
    pub chat_id: String,
    /// The id of the message
    pub message_id: String,
    /// The body of the message, already concatenated.
    pub content: String,
}
