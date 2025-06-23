use serde::{Deserialize, Serialize};
use specta::Type;
use tauri_specta::Event;

#[derive(Serialize, Deserialize, Type, Clone, Event)]
pub struct SetDbConnectionUri {
    pub uri: String,
}
