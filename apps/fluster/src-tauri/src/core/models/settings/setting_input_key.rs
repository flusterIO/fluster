use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Type, Deserialize, Clone)]
pub enum SettingPageInputId {
    Darkmode,
    RootRelativeFilePath,
    KeymapEntry,
    SystemWidePath,
}
