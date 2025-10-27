use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::{
        flashcard::data::models::{
            flashcard_entity::FlashcardEntity, flashcard_subject_entity::FlashcardSubjectEntity,
        },
        mdx::{
            data::{mdx_note_entity::MdxNoteEntity, mdx_note_subject_entity::MdxNoteSubjectEntity},
            methods::mdx_note_models_to_mdx_note_groups::mdx_note_models_to_mdx_note_groups,
        },
        search::types::PaginationProps,
        taggables::data::taggable_search_results::TraditionalSearchResults,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn get_subject_search_results(
    tag_values: Vec<String>,
) -> FlusterResult<TraditionalSearchResults> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let mdx_note_tags = MdxNoteSubjectEntity::get_by_values(&db, &tag_values).await?;
    let mut notes = Vec::new();
    if !mdx_note_tags.is_empty() {
        let mdx_notes = MdxNoteEntity::get_by_file_paths(
            &db,
            mdx_note_tags
                .iter()
                .map(|x| x.mdx_note_file_path.clone())
                .collect(),
        )
        .await?;
        notes = mdx_note_models_to_mdx_note_groups(&db, mdx_notes).await?;
    }

    let flashcard_subjects = FlashcardSubjectEntity::get_by_values(&db, &tag_values).await?;
    let mut flashcards = Vec::new();
    if !flashcard_subjects.is_empty() {
        let flashcard_ids_string = flashcard_subjects
            .iter()
            .map(|x| format!("\"{}\"", x.flashcard_id))
            .collect::<Vec<String>>()
            .join(", ");
        flashcards = FlashcardEntity::get_many(
            &db,
            &Some(format!("id in ({})", flashcard_ids_string)),
            &PaginationProps::take_all(),
        )
        .await?;
    }

    Ok(TraditionalSearchResults {
        notes,
        flashcards,
        tasks: Vec::new(),
        equations: Vec::new(),
        snippets: Vec::new(),
    })
}
