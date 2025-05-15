pub use fluster_types::enums::keymap_entry_type::KeymapEntryType;
pub use serde::{Deserialize, Serialize};

pub use crate::api::models::actions::global_action::GlobalAction;

#[derive(Serialize, Deserialize, Clone)]
pub struct KeymapSetting {
    pub action: GlobalAction,
    pub keymap_type: KeymapEntryType,
}
