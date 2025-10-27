use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::flashcard::data::models::{
        flashcard_entity::FlashcardEntity, flashcard_subject_entity::FlashcardSubjectEntity,
        flashcard_tag_entity::FlashcardTagEntity, flashcard_topic_entity::FlashcardTopicEntity,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn delete_flashcard_by_id(id: String) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    FlashcardEntity::delete_by_id(&db, id.clone()).await?;
    let taggable_predicate = format!("flashcard_id = \"{}\"", id.clone());
    FlashcardTopicEntity::delete(&db, taggable_predicate.clone()).await?;
    FlashcardSubjectEntity::delete(&db, taggable_predicate.clone()).await?;
    FlashcardTagEntity::delete(&db, taggable_predicate).await?;
    Ok(())
}
