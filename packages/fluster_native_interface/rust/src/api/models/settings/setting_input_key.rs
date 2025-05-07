use serde::{Deserialize, Serialize};
use tsify::Tsify;

#[derive(Serialize, Tsify, Deserialize, Clone)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum SettingPageInputId {
    Darkmode,
    RootRelativeFilePath,
    KeymapEntry,
    SystemWidePath,
}
