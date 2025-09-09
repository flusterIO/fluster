use serde::{Deserialize, Serialize};
use specta::Type;
use tauri_specta::Event;

#[derive(Serialize, Deserialize, Debug, Clone, Type)]
pub enum ToastVariant {
    Success,
    Info,
    Error,
}

#[derive(Serialize, Deserialize, Debug, Clone, Type, Event)]
pub struct ToastConfig {
    pub title: String,
    pub body: String,
    pub duration: i32,
    pub variant: ToastVariant,
    /// id is required to allow items to be removed reliably. It just needs to be unique.
    pub id: String,
}

impl ToastConfig {
    pub fn new(title: String, body: String, duration: i32, variant: ToastVariant) -> ToastConfig {
        ToastConfig {
            title,
            body,
            duration,
            variant,
            id: uuid::Uuid::new_v4().to_string(),
        }
    }
}
