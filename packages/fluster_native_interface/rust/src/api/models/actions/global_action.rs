use fluster_types::enums::global_action_id::GlobalActionId;
use serde::{Deserialize, Serialize};

use crate::api::models::settings::setting_input_key::SettingPageInputId;

#[derive(Serialize, Deserialize, Clone)]
pub struct GlobalAction {
    pub id: GlobalActionId,
    pub value: Option<String>,
    pub default_value: String,
    pub label: String,
    pub desc: String,
    pub input_key: SettingPageInputId,
}
