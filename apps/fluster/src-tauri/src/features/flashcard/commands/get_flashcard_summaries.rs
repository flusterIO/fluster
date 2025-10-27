use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::{
        flashcard::data::models::{
            flashcard_entity::FlashcardEntity, flashcard_model::FlashcardModel,
        },
        search::types::PaginationProps,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn get_flashcard_summaries(
    pagination: PaginationProps,
) -> FlusterResult<Vec<FlashcardModel>> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let flashcards = FlashcardEntity::get_many(&db, &None, &pagination).await?;
    Ok(flashcards)
}
