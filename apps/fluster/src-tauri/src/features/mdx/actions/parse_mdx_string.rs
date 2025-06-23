use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::mdx::data::mdx_note_group::MdxNoteGroup,
};

#[tauri::command]
#[specta::specta]
pub async fn parse_mdx_string(
    mdx_content: String,
    file_path: Option<String>,
) -> FlusterResult<MdxNoteGroup> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    MdxNoteGroup::from_raw_mdx_string(&db, mdx_content, file_path.unwrap_or("".to_string())).await
}
