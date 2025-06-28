use crate::core::{
    database::db::get_database,
    models::taggable::{shared_taggable_model::SharedTaggableModel, subject_entity::SubjectEntity},
    types::errors::errors::FlusterResult,
};

#[tauri::command]
#[specta::specta]
pub async fn get_all_subjects() -> FlusterResult<Vec<SharedTaggableModel>> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    SubjectEntity::get_all(&db).await
}
