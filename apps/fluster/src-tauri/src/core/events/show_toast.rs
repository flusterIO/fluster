use serde::{Deserialize, Serialize};
use specta::Type;
use sqlx::types::uuid;
use tauri_specta::Event;

#[derive(Serialize, Deserialize, Debug, Clone, Type)]
pub enum ToastVariant {
    Success,
    Info,
    Error,
}

#[derive(Serialize, Deserialize, Debug, Clone, Type, Event)]
pub struct ShowToast {
    title: String,
    body: String,
    duration: i32,
    variant: ToastVariant,
    /// id is required to allow items to be removed reliably. It just needs to be unique.
    id: String,
}

impl ShowToast {
    pub fn new(title: String, body: String, duration: i32, variant: ToastVariant) -> ShowToast {
        ShowToast {
            title,
            body,
            duration,
            variant,
            id: uuid::Uuid::new_v4().to_string(),
        }
    }
}
