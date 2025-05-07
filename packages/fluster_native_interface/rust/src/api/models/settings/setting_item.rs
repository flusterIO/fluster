use crate::api::models::enums::setting_unique_key::SettingUniqueKey;

use super::setting_input_key::SettingPageInputId;

pub struct Setting<T> {
    pub value: Option<T>,
    pub default_value: T,
    pub label: String,
    pub desc: Option<String>,
    pub setting_unique_key: SettingUniqueKey,
    pub input_key: SettingPageInputId,
}
