use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::{
        mdx::{
            data::{
                mdx_note_entity::MdxNoteEntity, mdx_note_equation_entity::MdxNoteEquationEntity,
            },
            methods::mdx_note_models_to_mdx_note_groups::mdx_note_models_to_mdx_note_groups,
        },
        taggables::data::taggable_search_results::TraditionalSearchResults,
    },
};

/// Accepts the user defined equation_id field, not the auto-generated id.
#[tauri::command]
#[specta::specta]
pub async fn get_notes_by_equation_id(
    equation_id: String,
) -> FlusterResult<TraditionalSearchResults> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let mdx_note_bib_entries =
        MdxNoteEquationEntity::get_by_equation_entry_id(&db, &equation_id).await?;
    let mdx_notes = MdxNoteEntity::get_by_file_paths(
        &db,
        mdx_note_bib_entries
            .iter()
            .map(|x| x.mdx_note_file_path.clone())
            .collect(),
    )
    .await?;
    let notes = mdx_note_models_to_mdx_note_groups(&db, mdx_notes).await?;
    // TODO: Return equation here too.
    Ok(TraditionalSearchResults {
        notes,
        tasks: Vec::new(),
        equations: Vec::new(),
    })
}
