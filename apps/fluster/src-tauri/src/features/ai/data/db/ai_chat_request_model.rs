use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Type, Clone)]
pub struct AiChatRequestMessageModel {
    pub id: String,
    /// The id of the accompanying AiChatModel row.
    pub chat_id: String,
    /// The user's input as the request body.
    pub body: String,
    /// The stringified unix timestamp of the time the message was sent.
    pub sent_at: String,
}
