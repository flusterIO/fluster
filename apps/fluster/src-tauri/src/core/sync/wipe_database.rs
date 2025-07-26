use crate::core::{
    database::db::get_database_path,
    types::errors::errors::{FlusterError, FlusterResult},
};

#[tauri::command]
#[specta::specta]
pub async fn wipe_database() -> FlusterResult<()> {
    let dir = get_database_path().expect("Gets the database path.");
    tokio::fs::remove_dir_all(dir).await.map_err(|e| {
        println!("Error in wipe_database: {:?}", e);
        FlusterError::FailToDelete
    })?;
    Ok(())
}
