use serde::{Deserialize, Serialize};

#[derive(strum_macros::Display, Serialize, Deserialize, specta::Type, Clone, Debug)]
pub enum AutoSettingType {
    Tag,
    Topic,
    Subject,
}

#[derive(Serialize, Deserialize, specta::Type, Clone, Debug)]
pub struct AutoSettingModel {
    pub id: String,
    pub glob: String,
    pub value: String,
    pub setting_type: AutoSettingType,
}
