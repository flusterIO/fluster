use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::{
        bibliography::data::{bib_entry_entity::BibEntryEntity, bib_entry_model::BibEntryModel},
        search::types::PaginationProps,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn get_bib_entries(
    predicate: Option<String>,
    pagination: PaginationProps,
) -> FlusterResult<Vec<BibEntryModel>> {
    let db_res = get_database().await;
    let db = db_res.lock().await;

    BibEntryEntity::get_many(&db, &predicate, &pagination).await
}
