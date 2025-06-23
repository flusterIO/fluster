pub use crate::core::types::enums::setting_unique_key::SettingUniqueKey;

pub use crate::core::models::settings::setting_input_key::SettingPageInputId;

pub struct DoubleSetting {
    pub value: Option<f32>,
    pub default_value: f32,
    pub label: String,
    pub setting_unique_key: SettingUniqueKey,
    pub input_key: SettingPageInputId,
    pub desc: String,
}
