use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::{mdx::data::bookmark_entity::BookmarkEntity, search::types::PaginationProps},
};

#[tauri::command]
#[specta::specta]
pub async fn file_path_is_bookmarked(note_file_path: String) -> FlusterResult<bool> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let bookmarks = BookmarkEntity::get_many(
        &db,
        &None,
        &PaginationProps {
            page_number: 1,
            per_page: 99999,
        },
    )
    .await?;
    Ok(bookmarks.iter().any(|x| x.mdx_file_path == note_file_path))
    // BookmarkEntity::save_many(
    //     &db,
    //     &[BookmarkModel {
    //         mdx_file_path: note_file_path,
    //         id: uuid::Uuid::new_v4().to_string(),
    //     }],
    // )
    // .await
}
