use serde::{Deserialize, Serialize};
use tsify::Tsify;

#[derive(Serialize, Tsify, Deserialize, Clone, PartialEq, Hash, Eq, Default)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum KeymapSectionId {
    #[default]
    Navigation,
    UiAndLayout,
}

#[derive(Serialize, Tsify, Deserialize, Clone, PartialEq, Hash, Eq)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum SettingSectionId {
    General,
    Navigation,
    SyncingDirectorySettings,
}
