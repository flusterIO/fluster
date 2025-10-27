use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::{
        mdx::{
            data::{
                mdx_note_bib_entry_entity::MdxNoteBibEntryEntity, mdx_note_entity::MdxNoteEntity,
            },
            methods::mdx_note_models_to_mdx_note_groups::mdx_note_models_to_mdx_note_groups,
        },
        taggables::data::taggable_search_results::TraditionalSearchResults,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn get_notes_by_bib_entry_id(
    bib_entry_id: String,
) -> FlusterResult<TraditionalSearchResults> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let mdx_note_bib_entries =
        MdxNoteBibEntryEntity::get_by_bib_entry_id(&db, &bib_entry_id).await?;
    println!("Found {} items", mdx_note_bib_entries.clone().len());
    let mdx_notes = MdxNoteEntity::get_by_file_paths(
        &db,
        mdx_note_bib_entries
            .iter()
            .map(|x| x.mdx_note_file_path.clone())
            .collect(),
    )
    .await?;
    let notes = mdx_note_models_to_mdx_note_groups(&db, mdx_notes).await?;
    Ok(TraditionalSearchResults {
        notes,
        flashcards: Vec::new(),
        tasks: Vec::new(),
        equations: Vec::new(),
        snippets: Vec::new(),
    })
}
