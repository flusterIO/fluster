pub use crate::core::types::enums::keymap_entry_type::KeymapEntryType;
pub use serde::{Deserialize, Serialize};

pub use crate::core::models::actions::global_action::GlobalAction;

#[derive(Serialize, Deserialize, Clone)]
pub struct KeymapSetting {
    pub action: GlobalAction,
    pub keymap_type: KeymapEntryType,
}
