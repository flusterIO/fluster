use crate::core::{
    database::db::get_database,
    types::errors::errors::{FlusterError, FlusterResult},
};

use super::snippet_entity::SnippetEntity;

#[tauri::command]
#[specta::specta]
pub async fn delete_snippet_by_id(id: String) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    SnippetEntity::delete_by_id(id, db).await
}
