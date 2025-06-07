use crate::{
    core::types::errors::errors::FlusterResult, features::mdx::data::mdx_note_group::MdxNoteGroup,
};

#[tauri::command]
#[specta::specta]
pub async fn read_mdx_file(file_path: String) -> FlusterResult<MdxNoteGroup> {
    MdxNoteGroup::from_file_system_path_async(file_path).await
}
