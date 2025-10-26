use crate::{
    core::types::errors::errors::FlusterResult,
    features::flashcard::data::models::flashcard_model::FlashcardModel,
};

#[tauri::command]
#[specta::specta]
pub async fn save_flashcard(
    item: FlashcardModel,
    tags: Vec<String>,
    topic: Option<String>,
    subject: Option<String>,
) -> FlusterResult<()> {
    Ok(())
}
