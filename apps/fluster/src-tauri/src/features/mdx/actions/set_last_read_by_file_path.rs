use std::ops::Index;

use chrono::Utc;

use crate::{
    core::{
        database::db::get_database,
        types::errors::errors::{FlusterError, FlusterResult},
    },
    features::mdx::data::mdx_note_entity::MdxNoteEntity,
};

#[tauri::command]
#[specta::specta]
pub async fn set_last_read_by_file_path(file_path: String) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let res = MdxNoteEntity::get_by_file_paths(&db, vec![file_path]).await?;
    if res.len() != 1 {
        return Err(FlusterError::FailToFind);
    }
    let mut item = res.index(0).clone();
    item.last_read = Utc::now().timestamp_millis().to_string();
    MdxNoteEntity::save_many(&db, vec![item]).await?;
    Ok(())
}
