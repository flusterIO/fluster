use crate::{
    core::{
        database::db::get_database,
        types::errors::errors::{FlusterError, FlusterResult},
    },
    features::{
        mdx::{
            data::{
                mdx_note_dictionary_entry_entity::MdxNoteDictionaryEntryEntity,
                mdx_note_entity::MdxNoteEntity,
            },
            methods::mdx_note_models_to_mdx_note_groups::mdx_note_models_to_mdx_note_groups,
        },
        taggables::data::taggable_search_results::TraditionalSearchResults,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn get_note_by_dict_entry_label(
    dict_entry_label: String,
) -> FlusterResult<TraditionalSearchResults> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let mdx_note_bib_entries =
        MdxNoteDictionaryEntryEntity::get_by_labels(&db, &[dict_entry_label]).await?;
    println!("Entries: {:?}", mdx_note_bib_entries.len());
    if mdx_note_bib_entries.len() != 1 {
        return Err(FlusterError::FailToFind);
    }
    let mdx_notes = MdxNoteEntity::get_by_file_paths(
        &db,
        mdx_note_bib_entries
            .iter()
            .map(|x| x.mdx_note_file_path.clone())
            .collect(),
    )
    .await?;
    let notes = mdx_note_models_to_mdx_note_groups(&db, mdx_notes).await?;
    Ok(TraditionalSearchResults { notes })
}
