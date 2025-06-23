use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::dictionary::{
        dictionary_entry_entity::DictionaryEntryEntity,
        dictionary_entry_model::DictionaryEntryModel,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn get_dictionary_entries() -> FlusterResult<Vec<DictionaryEntryModel>> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    DictionaryEntryEntity::get_all(&db).await
}
