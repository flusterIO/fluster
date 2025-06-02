use crate::core::types::errors::errors::FlusterResult;

use super::data::mdx_note_group::MdxNoteGroup;

/// This method is used when the search param fsPath is set. This is similar to the way the app
/// worked in the previous rendtion when 'prefer fs' was enabled by the user.
#[tauri::command]
#[specta::specta]
pub async fn read_mdx_from_fs(fs_path: String) -> FlusterResult<MdxNoteGroup> {
    MdxNoteGroup::from_file_system_path_async(fs_path).await
}
