use crate::core::types::errors::errors::{FlusterError, FlusterResult};

#[tauri::command]
#[specta::specta]
pub fn get_environment_variable(key: String) -> FlusterResult<String> {
    std::env::var(key.clone()).map_err(|_| FlusterError::FailToLoadEnvironmentVariable(key))
}
