use serde::{Deserialize, Serialize};
use specta::Type;

use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::{
        mdx::data::{
            bookmark_entity::BookmarkEntity, front_matter_entity::FrontMatterEntity,
            front_matter_model::FrontMatterBaseModel, mdx_note_entity::MdxNoteEntity,
            mdx_note_model::MdxNoteModel,
        },
        search::types::PaginationProps,
    },
};

#[derive(Serialize, Deserialize, Type)]
pub struct MdxBookmarkData {
    note: MdxNoteModel,
    front_matter: FrontMatterBaseModel,
}

#[tauri::command]
#[specta::specta]
pub async fn get_bookmarked_notes() -> FlusterResult<Vec<MdxBookmarkData>> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let bookmarks = BookmarkEntity::get_many(
        &db,
        &None,
        &PaginationProps {
            per_page: 999999,
            page_number: 1,
        },
    )
    .await?;
    let file_paths = bookmarks
        .iter()
        .map(|x| x.mdx_file_path.clone())
        .collect::<Vec<String>>();
    let notes = MdxNoteEntity::get_by_file_paths(&db, file_paths.clone()).await?;
    let front_matter = FrontMatterEntity::get_by_file_paths(&db, &file_paths).await?;
    let mut items: Vec<MdxBookmarkData> = Vec::new();
    for bm in notes {
        if let Some(fm) = front_matter
            .iter()
            .find(|x| x.mdx_note_file_path == bm.file_path)
        {
            items.push(MdxBookmarkData {
                note: bm,
                front_matter: fm.clone(),
            });
        }
    }
    Ok(items)
}
