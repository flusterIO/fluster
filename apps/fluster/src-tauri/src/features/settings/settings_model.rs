use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Type, Serialize, Deserialize, Clone)]
pub struct SettingsModel {
    pub id: String,
    /// The json serialized state.
    pub body: String,
}
