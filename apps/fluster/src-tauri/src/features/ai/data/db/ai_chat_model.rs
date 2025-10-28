use chrono::Utc;
use serde::{Deserialize, Serialize};
use specta::Type;
// pub struct DefaultAISettings {

// }

/// The database entity representing a specific chat historys
#[derive(Serialize, Deserialize, Type, Clone, Debug)]
pub struct AiChatModel {
    pub id: String,
    pub label: String,
    pub model: String,
    pub temperature: f32,
    pub repeat_penalty: f32,
    pub top_k: u32,
    pub top_p: f32,
    pub ctime: String,
}

impl Default for AiChatModel {
    fn default() -> Self {
        Self {
            id: Default::default(),
            label: Default::default(),
            model: Default::default(),
            temperature: 0.2,
            repeat_penalty: 1.5,
            top_k: 25,
            top_p: 0.25,
            ctime: Utc::now().timestamp_millis().to_string(),
        }
    }
}
