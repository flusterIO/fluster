use core::slice;

use crate::{
    core::{
        database::db::get_database,
        models::taggable::{
            shared_taggable_model::SharedTaggableModel, subject_entity::SubjectEntity,
            tag_entity::TagEntity, topic_entity::TopicEntity,
        },
        types::errors::errors::FlusterResult,
    },
    features::flashcard::data::models::{
        flashcard_entity::FlashcardEntity, flashcard_model::FlashcardModel,
        flashcard_subject_entity::FlashcardSubjectEntity,
        flashcard_subject_model::FlashcardSubjectModel, flashcard_tag_entity::FlashcardTagEntity,
        flashcard_tag_model::FlashcardTagModel, flashcard_topic_entity::FlashcardTopicEntity,
        flashcard_topic_model::FlashcardTopicModel,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn save_flashcard(
    item: FlashcardModel,
    tags: Vec<String>,
    topic: Option<String>,
    subject: Option<String>,
) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    FlashcardEntity::save_many(&db, slice::from_ref(&item)).await?;
    let now = chrono::Utc::now().timestamp_millis().to_string();
    if !tags.is_empty() {
        TagEntity::save_many(
            &db,
            tags.iter()
                .map(|t| SharedTaggableModel {
                    value: t.clone(),
                    utime: now.clone(),
                })
                .collect(),
        )
        .await?;
        FlashcardTagEntity::create_many(
            &db,
            tags.iter()
                .map(|tag| FlashcardTagModel {
                    tag_value: tag.clone(),
                    flashcard_id: item.id.clone(),
                })
                .collect(),
        )
        .await?;
    }
    if topic.is_some() {
        TopicEntity::create_many(
            &db,
            vec![SharedTaggableModel {
                value: topic.clone().unwrap(),
                utime: now.clone(),
            }],
        )
        .await?;
        FlashcardTopicEntity::create_many(
            &db,
            vec![FlashcardTopicModel {
                topic_value: topic.unwrap(),
                flashcard_id: item.id.clone(),
            }],
        )
        .await?;
    }

    if subject.is_some() {
        SubjectEntity::create_many(
            &db,
            vec![SharedTaggableModel {
                value: subject.clone().unwrap(),
                utime: now,
            }],
        )
        .await?;
        FlashcardSubjectEntity::create_many(
            &db,
            vec![FlashcardSubjectModel {
                flashcard_id: item.id.clone(),
                subject_value: subject.unwrap(),
            }],
        )
        .await?;
    }
    Ok(())
}
