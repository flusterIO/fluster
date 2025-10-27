use serde::{Deserialize, Serialize};

use crate::{
    core::{
        database::db::get_database,
        models::taggable::{
            shared_taggable_model::SharedTaggableModel, subject_entity::SubjectEntity,
            topic_entity::TopicEntity,
        },
        types::errors::errors::FlusterResult,
    },
    features::{
        flashcard::data::models::{
            flashcard_subject_entity::FlashcardSubjectEntity,
            flashcard_topic_entity::FlashcardTopicEntity,
        },
        search::types::PaginationProps,
    },
};

#[derive(Serialize, Deserialize, specta::Type, Clone, Debug)]
pub struct FlashcardTopicSubjectData {
    pub subjects: Vec<SharedTaggableModel>,
    pub topics: Vec<SharedTaggableModel>,
}

#[tauri::command]
#[specta::specta]
pub async fn get_flashcard_topics_and_subjects() -> FlusterResult<FlashcardTopicSubjectData> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let flashcard_topics =
        FlashcardTopicEntity::get_all(&db, PaginationProps::take_all(), None).await?;
    let flashcard_subjects =
        FlashcardSubjectEntity::get_all(&db, PaginationProps::take_all(), None).await?;
    let topics = TopicEntity::get_by_values(
        &db,
        flashcard_topics
            .iter()
            .map(|topic| topic.topic_value.clone())
            .collect(),
    )
    .await?;
    let subjects = SubjectEntity::get_by_values(
        &db,
        flashcard_subjects
            .iter()
            .map(|subject| subject.subject_value.clone())
            .collect(),
    )
    .await?;
    let data = FlashcardTopicSubjectData { subjects, topics };
    Ok(data)
}
