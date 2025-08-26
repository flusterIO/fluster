use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::{
        mdx::{
            data::{mdx_note_entity::MdxNoteEntity, mdx_note_tag_entity::MdxNoteTagEntity},
            methods::mdx_note_models_to_mdx_note_groups::mdx_note_models_to_mdx_note_groups,
        },
        taggables::data::taggable_search_results::TraditionalSearchResults,
        task_manager::{task_entity::TaskEntity, task_tag_entity::TaskTagEntity},
    },
};

#[tauri::command]
#[specta::specta]
pub async fn get_tag_search_results(
    tag_values: Vec<String>,
) -> FlusterResult<TraditionalSearchResults> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let mdx_note_tags = MdxNoteTagEntity::get_by_tag_values(&db, &tag_values).await?;
    let task_tags = TaskTagEntity::get_by_values(&db, tag_values).await?;
    let tasks =
        TaskEntity::get_by_ids(&db, task_tags.iter().map(|x| x.task_id.clone()).collect()).await?;
    let mdx_notes = MdxNoteEntity::get_by_file_paths(
        &db,
        mdx_note_tags
            .iter()
            .map(|x| x.mdx_note_file_path.clone())
            .collect(),
    )
    .await?;
    let notes = mdx_note_models_to_mdx_note_groups(&db, mdx_notes).await?;

    Ok(TraditionalSearchResults { notes, tasks })
}
