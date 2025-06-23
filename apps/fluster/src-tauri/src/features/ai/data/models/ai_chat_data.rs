use crate::features::ai::data::db::{
    ai_chat_model::AiChatModel, ai_chat_request_model::AiChatRequestMessageModel,
    ai_chat_response_model::AiChatResponseMessageModel,
};
use serde::{Deserialize, Serialize};
use specta::Type;

/// A utility struct that combines the ChatModel, AiChatMessageResponse, and AiChatMessageRequest
/// entities into a single struct.

#[derive(Serialize, Deserialize, Type)]
pub struct AiChatData {
    pub chat: AiChatModel,
    pub outgoing: Vec<AiChatRequestMessageModel>,
    pub incoming: Vec<AiChatResponseMessageModel>,
}
