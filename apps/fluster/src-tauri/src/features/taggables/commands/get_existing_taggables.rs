use serde::{Deserialize, Serialize};

use crate::core::{
    database::db::get_database,
    models::taggable::{
        shared_taggable_model::SharedTaggableModel, subject_entity::SubjectEntity,
        tag_entity::TagEntity, topic_entity::TopicEntity,
    },
};

#[derive(Serialize, Deserialize, specta::Type, Debug, Clone)]
pub struct AllTaggableData {
    pub tags: Vec<SharedTaggableModel>,
    pub topics: Vec<SharedTaggableModel>,
    pub subjects: Vec<SharedTaggableModel>,
}

#[tauri::command]
#[specta::specta]
pub async fn get_existing_taggables() -> AllTaggableData {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let (tags, topics, subjects) = tokio::join!(
        TagEntity::get_many(&db),
        TopicEntity::get_all(&db),
        SubjectEntity::get_all(&db),
    );
    AllTaggableData {
        tags: tags.unwrap_or(Vec::new()),
        topics: topics.unwrap_or(Vec::new()),
        subjects: subjects.unwrap_or(Vec::new()),
    }
}
