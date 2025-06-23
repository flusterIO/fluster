use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::bibliography::data::{
        bib_entry_entity::BibEntryEntity, bib_entry_model::BibEntryModel,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn sync_bib(entries: Vec<BibEntryModel>) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    BibEntryEntity::save_many(&db, &entries).await?;
    Ok(())
}
