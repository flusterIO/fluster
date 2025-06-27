use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::mdx::data::mdx_note_group::MdxNoteGroup,
};

#[tauri::command]
#[specta::specta]
pub async fn read_mdx_file(file_path: String) -> FlusterResult<MdxNoteGroup> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    MdxNoteGroup::from_file_system_path(&db, file_path, None).await
}
