use crate::core::types::errors::errors::FlusterResult;

use super::initialize_database::initialize_database;

#[tauri::command]
#[specta::specta]
pub async fn initialize_desktop() -> FlusterResult<()> {
    initialize_database().await?;
    Ok(())
}
