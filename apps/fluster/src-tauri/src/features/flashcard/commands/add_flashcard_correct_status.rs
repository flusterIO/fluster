use std::ops::Index;

use crate::{
    core::{
        database::db::get_database,
        types::errors::errors::{FlusterError, FlusterResult},
    },
    features::flashcard::data::models::{
        flashcard_entity::FlashcardEntity, flashcard_model::FlashcardModel,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn set_flashcard_complete_status(
    flashcard_id: String,
    correct: bool,
) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let items = FlashcardEntity::get_by_ids(&db, vec![flashcard_id]).await?;
    if items.len() != 1 {
        return Err(FlusterError::FailToFindById);
    }
    let item = items.index(0);
    let new_item = FlashcardModel {
        id: item.id.clone(),
        label: item.label.clone(),
        question: item.question.clone(),
        question_description: item.question_description.clone(),
        answer: item.answer.clone(),
        answer_description: item.answer.clone(),
        correct_count: match correct {
            true => item.correct_count + 1,
            false => item.correct_count,
        },
        incorrect_count: match correct {
            true => item.incorrect_count,
            false => item.incorrect_count + 1,
        },
    };
    FlashcardEntity::save_many(&db, &[new_item]).await?;
    Ok(())
}
