use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::bibliography::data::bib_entry_entity::BibEntryEntity,
};

#[tauri::command]
#[specta::specta]
pub async fn get_bib_entry_count(predicate: Option<String>) -> FlusterResult<usize> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    BibEntryEntity::get_count(&db, predicate).await
}
