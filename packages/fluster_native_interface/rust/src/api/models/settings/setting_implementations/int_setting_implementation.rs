pub use fluster_types::enums::setting_unique_key::SettingUniqueKey;

pub struct IntSetting {
    pub value: Option<i32>,
    pub default_value: i32,
    pub label: String,
    pub setting_unique_key: SettingUniqueKey,
    pub desc: String,
}
