use crate::core::types::errors::errors::{FlusterError, FlusterResult};

#[tauri::command]
#[specta::specta]
pub async fn read_utf8_file(fs_path: String) -> FlusterResult<String> {
    if let Ok(exists) = std::fs::exists(&fs_path) {
        let res = tokio::fs::read_to_string(&fs_path)
            .await
            .map_err(|_| FlusterError::FailToReadFileSystemPath(fs_path.clone()))?;
        Ok(res)
    } else {
        Err(FlusterError::FailToReadFileSystemPath(fs_path.clone()))
    }
}

#[tauri::command]
#[specta::specta]
pub async fn save_utf8_file(fs_path: String, file_content: String) -> FlusterResult<()> {
    tokio::fs::write(&fs_path, file_content)
        .await
        .map_err(|_| FlusterError::FailToSaveFile(fs_path.clone()))
}
