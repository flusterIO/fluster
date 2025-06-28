use crate::core::{
    database::db::get_database,
    models::taggable::{shared_taggable_model::SharedTaggableModel, topic_entity::TopicEntity},
    types::errors::errors::FlusterResult,
};

#[tauri::command]
#[specta::specta]
pub async fn get_all_topics() -> FlusterResult<Vec<SharedTaggableModel>> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    TopicEntity::get_all(&db).await
}
