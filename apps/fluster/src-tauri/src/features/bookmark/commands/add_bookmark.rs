use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::mdx::data::{bookmark_entity::BookmarkEntity, bookmark_model::BookmarkModel},
};

#[tauri::command]
#[specta::specta]
pub async fn add_bookmark(note_file_path: String) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    BookmarkEntity::save_many(
        &db,
        &[BookmarkModel {
            mdx_file_path: note_file_path,
            id: uuid::Uuid::new_v4().to_string(),
        }],
    )
    .await
}
