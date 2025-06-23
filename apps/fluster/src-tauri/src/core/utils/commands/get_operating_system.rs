use serde::{Deserialize, Serialize};
use specta::Type;

use crate::core::types::errors::errors::{FlusterError, FlusterResult};

#[derive(Type, Serialize, Deserialize)]
pub enum SupportedOperatingSystem {
    Windows,
    Mac,
    Linux,
    Ios,
    Android,
    NotSupported,
}

#[tauri::command]
#[specta::specta]
pub async fn get_operating_system() -> FlusterResult<SupportedOperatingSystem> {
    match std::env::consts::OS {
        "linux" => Ok(SupportedOperatingSystem::Linux),
        "macos" => Ok(SupportedOperatingSystem::Mac),
        "ios" => Ok(SupportedOperatingSystem::Ios),
        "android" => Ok(SupportedOperatingSystem::Android),
        _ => Err(FlusterError::OperatingSystemNotSupported),
    }
}
