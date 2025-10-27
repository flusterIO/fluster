use std::ops::Index;

use crate::{
    core::{
        database::db::get_database,
        types::errors::errors::{FlusterError, FlusterResult},
    },
    features::flashcard::data::models::{
        flashcard_entity::FlashcardEntity, flashcard_model::FlashcardGroup,
        flashcard_subject_entity::FlashcardSubjectEntity, flashcard_tag_entity::FlashcardTagEntity,
        flashcard_topic_entity::FlashcardTopicEntity,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn get_flashcard_data(id: String) -> FlusterResult<FlashcardGroup> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let flashcards = FlashcardEntity::get_by_ids(&db, vec![id.clone()]).await?;
    if flashcards.len() != 1 {
        return Err(FlusterError::FailToFindById);
    }
    let flashcard = flashcards.index(0);
    let flashcard_tags = FlashcardTagEntity::get_by_flashcard_ids(&db, &vec![id.clone()]).await?;
    let topics = FlashcardTopicEntity::get_by_flashcard_ids(&db, &vec![id.clone()]).await?;
    let topic = match topics.len() {
        1 => Some(topics.index(0).clone()),
        _ => None,
    };

    let subjects = FlashcardSubjectEntity::get_by_flashcard_ids(&db, &vec![id]).await?;
    let subject = match subjects.len() {
        1 => Some(subjects.index(0).clone()),
        _ => None,
    };
    let data = FlashcardGroup {
        id: flashcard.id.clone(),
        label: flashcard.label.clone(),
        answer: flashcard.answer.clone(),
        answer_description: flashcard.answer_description.clone(),
        question: flashcard.question.clone(),
        question_description: flashcard.question_description.clone(),
        correct_count: flashcard.correct_count.clone(),
        incorrect_count: flashcard.incorrect_count.clone(),
        topic,
        subject,
        tags: flashcard_tags,
    };
    Ok(data)
}
