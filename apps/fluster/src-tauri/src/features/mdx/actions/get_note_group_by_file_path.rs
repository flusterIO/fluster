use std::ops::Index;

use crate::{
    core::{
        database::db::get_database,
        types::errors::errors::{FlusterError, FlusterResult},
    },
    features::mdx::{
        data::{mdx_note_entity::MdxNoteEntity, mdx_note_group::MdxNoteGroup},
        methods::mdx_note_models_to_mdx_note_groups::mdx_note_models_to_mdx_note_groups,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn get_note_group_by_file_path(file_path: String) -> FlusterResult<MdxNoteGroup> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let group = MdxNoteEntity::get_by_file_paths(&db, vec![file_path]).await?;

    if group.len() == 1 {
        let res = mdx_note_models_to_mdx_note_groups(&db, group).await?;
        if res.len() == 1 {
            return Ok(res.index(0).clone());
        };
    }
    Err(FlusterError::FailToFindById)
}
