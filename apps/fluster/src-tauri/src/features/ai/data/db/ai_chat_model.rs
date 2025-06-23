use serde::{Deserialize, Serialize};
use specta::Type;

/// The database entity representing a specific chat historys
#[derive(Serialize, Deserialize, Type, Clone)]
pub struct AiChatModel {
    pub id: String,
    pub label: String,
    pub ctime: String,
}
