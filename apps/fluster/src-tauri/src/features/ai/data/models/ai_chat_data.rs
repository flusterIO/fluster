use crate::features::ai::data::db::{
    ai_chat_message_model::AiChatMessageModel, ai_chat_model::AiChatModel,
};
use serde::{Deserialize, Serialize};
use specta::Type;
/// A utility struct that combines the ChatModel, AiChatMessageResponse, and AiChatMessageRequest
/// entities into a single struct.

#[derive(Serialize, Deserialize, Type, Clone, Debug)]
pub struct AiChatData {
    pub chat: AiChatModel,
    pub messages: Vec<AiChatMessageModel>,
}
