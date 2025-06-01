use crate::core::{
    database::db::get_database, models::taggable::shared_taggable_model::SharedTaggableModel,
    types::errors::errors::FlusterResult,
};

use super::{snippet_entity::SnippetEntity, snippet_model::SnippetModel};

#[tauri::command]
#[specta::specta]
pub async fn get_snippet_by_id(
    id: String,
) -> FlusterResult<(SnippetModel, Vec<SharedTaggableModel>)> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let snippet = SnippetEntity::get_by_id(id, db).await?;
    // TODO: Get the tags from the join table here as well and return them.
    Ok((snippet, Vec::new()))
}
