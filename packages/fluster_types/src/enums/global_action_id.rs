use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub enum GlobalActionId {
    ToggleRightPanel,
    ToggleLeftPanel,
    CommandPaletteOpen,
    CommandPaletteBack,
    SelectItemRight,
    SelectItemLeft,
    SelectItemUp,
    SelectItemDown,
    SyncDirectoryWithDatabase,
    ToggleDarkMode,
}
