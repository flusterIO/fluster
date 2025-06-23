use serde::{Deserialize, Serialize};

use crate::core::models::settings::setting_input_key::SettingPageInputId;

#[derive(Clone, Serialize, Deserialize)]
pub struct SettingItem {
    /// All settings, regardless of type must be serialized as a string before being passed to Rust.
    pub value: Option<String>,
    /// All settings, regardless of type must be serialized as a string before being passed to Rust.
    pub default_value: String,
    pub label: String,
    pub desc: String,
    pub input_id: SettingPageInputId, // fn get_formatted_id() -> String;
}
