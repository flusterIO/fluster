use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::{
        mdx::{
            data::{mdx_note_entity::MdxNoteEntity, mdx_note_subject_entity::MdxNoteSubjectEntity},
            methods::mdx_note_models_to_mdx_note_groups::mdx_note_models_to_mdx_note_groups,
        },
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
    if mdx_note_tags.is_empty() {
        return Ok(TraditionalSearchResults {
            notes: Vec::new(),
            tasks: Vec::new(),
        });
    }
    let mdx_notes = MdxNoteEntity::get_by_file_paths(
        &db,
        mdx_note_tags
            .iter()
            .map(|x| x.mdx_note_file_path.clone())
            .collect(),
    )
    .await?;
    let notes = mdx_note_models_to_mdx_note_groups(&db, mdx_notes).await?;

    Ok(TraditionalSearchResults {
        notes,
        tasks: Vec::new(),
    })
}
