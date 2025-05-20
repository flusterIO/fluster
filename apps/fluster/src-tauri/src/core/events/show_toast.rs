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
pub struct ShowToast {
    title: String,
    body: String,
    duration: i32,
    variant: ToastVariant,
}

impl ShowToast {
    pub fn new(title: String, body: String, duration: i32, variant: ToastVariant) -> ShowToast {
        ShowToast {
            title,
            body,
            duration,
            variant,
        }
    }
}
