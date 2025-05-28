use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Type, Deserialize, Clone, PartialEq, Hash, Eq, Default)]
pub enum KeymapSectionId {
    #[default]
    Navigation,
    UiAndLayout,
}

#[derive(Serialize, Type, Deserialize, Clone, PartialEq, Hash, Eq)]
pub enum SettingSectionId {
    General,
    Navigation,
    SyncingDirectorySettings,
}
