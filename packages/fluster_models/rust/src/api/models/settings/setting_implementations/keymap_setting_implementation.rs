use serde::{Deserialize, Serialize};

use crate::models::{
    actions::global_action::GlobalAction, enums::keymap_entry_type::KeymapEntryType,
};

#[derive(Serialize, Deserialize, Clone)]
pub struct KeymapSetting {
    pub action: GlobalAction,
    pub keymap_type: KeymapEntryType,
}
