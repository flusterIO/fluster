use crate::features::ai::data::db::{
    ai_chat_message_model::AiChatMessageModel, ai_chat_model::AiChatModel,
};
use py_rs::PY;
use serde::{Deserialize, Serialize};
use specta::Type;
/// A utility struct that combines the ChatModel, AiChatMessageResponse, and AiChatMessageRequest
/// entities into a single struct.

#[derive(Serialize, Deserialize, Type, PY)]
#[py(
    export,
    export_to = "../../src-python/fluster_sidecar_api/core/types/AiChatMessage.py"
)]
pub struct AiChatData {
    pub chat: AiChatModel,
    pub messages: Vec<AiChatMessageModel>,
}
