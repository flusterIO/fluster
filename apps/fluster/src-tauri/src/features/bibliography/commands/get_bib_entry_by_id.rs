use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::bibliography::data::{
        bib_entry_entity::BibEntryEntity, bib_entry_model::BibEntryModel,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn get_bib_entry_by_id(id: String) -> FlusterResult<BibEntryModel> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    BibEntryEntity::get_by_id(&db, &id).await
}
