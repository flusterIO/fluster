use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::{
        bibliography::data::{bib_entry_entity::BibEntryEntity, bib_entry_model::BibEntryModel},
        search::types::PaginationProps,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn bib_entries_full_text_search(
    query: String,
    pagination: PaginationProps,
) -> FlusterResult<Vec<BibEntryModel>> {
    let db_res = get_database().await;
    let db = db_res.lock().await;

    BibEntryEntity::full_text_search(&db, &query, &pagination).await
}
