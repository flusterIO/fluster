use serde::{Deserialize, Serialize};

use super::traits::setting_trait::SettingItem;

#[derive(Clone, Serialize, Deserialize)]
pub struct SettingSection {
    pub label: Option<String>,
    pub subtitle: Option<String>,
    pub items: Vec<SettingItem>,
}
