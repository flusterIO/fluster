use crate::core::types::errors::errors::{FlusterError, FlusterResult};

#[tauri::command]
#[specta::specta]
pub async fn delete_snippet_by_id(id: i32) -> FlusterResult<()> {
    println!("Id: {:?}", id);
    Err(FlusterError::NotImplemented)
}
