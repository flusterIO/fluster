use std::ops::Index;

use crate::{
    core::{
        database::db::get_database,
        types::errors::errors::{FlusterError, FlusterResult},
    },
    features::mdx::{
        data::{
            front_matter_entity::FrontMatterEntity, mdx_note_entity::MdxNoteEntity,
            mdx_note_group::MdxNoteGroup,
        },
        methods::mdx_note_models_to_mdx_note_groups::mdx_note_models_to_mdx_note_groups,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn get_note_by_user_provided_id(user_provided_id: String) -> FlusterResult<MdxNoteGroup> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let res = FrontMatterEntity::get_by_file_paths(&db, &vec![user_provided_id]).await?;
    if res.len() != 1 {
        return Err(FlusterError::FailToFind);
    }
    let notes =
        MdxNoteEntity::get_by_file_paths(&db, vec![res.index(0).mdx_note_file_path.clone()])
            .await?;
    if notes.len() != 1 {
        return Err(FlusterError::FailToFind);
    }
    let groups = mdx_note_models_to_mdx_note_groups(&db, notes).await?;
    if groups.len() != 1 {
        return Err(FlusterError::FailToFind);
    }
    Ok(groups.index(0).clone())
}
