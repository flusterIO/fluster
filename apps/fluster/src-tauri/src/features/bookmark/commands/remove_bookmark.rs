use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::mdx::data::bookmark_entity::BookmarkEntity,
};

#[tauri::command]
#[specta::specta]
pub async fn remove_bookmark(note_file_path: String) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    BookmarkEntity::delete_by_file_path(&db, note_file_path).await
}
