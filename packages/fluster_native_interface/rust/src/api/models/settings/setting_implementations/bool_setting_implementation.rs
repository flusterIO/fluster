use crate::api::models::enums::setting_unique_key::SettingUniqueKey;

pub struct BoolSetting {
    pub value: Option<bool>,
    pub default_value: bool,
    pub label: String,
    pub setting_unique_key: SettingUniqueKey,
}
