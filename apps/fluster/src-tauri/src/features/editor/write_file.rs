use crate::{
    core::types::errors::errors::FlusterResult, features::mdx::data::mdx_note_group::MdxNoteGroup,
};

#[tauri::command]
#[specta::specta]
pub async fn write_file(file_path: String, content: String) -> FlusterResult<()> {
    tokio::fs::write(file_path, content)
        .await
        .map_err(|_| crate::core::types::errors::errors::FlusterError::FailToWriteFile)
}
