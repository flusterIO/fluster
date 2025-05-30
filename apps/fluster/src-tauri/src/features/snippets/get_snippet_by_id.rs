use crate::core::{
    models::taggable::shared_taggable_model::SharedTaggableModel,
    types::errors::errors::{FlusterError, FlusterResult},
};

use super::snippet_model::SnippetModel;

#[tauri::command]
#[specta::specta]
pub async fn get_snippet_by_id(
    id: String,
) -> FlusterResult<(SnippetModel, Vec<SharedTaggableModel>)> {
    println!("Id: {:?}", id);
    // let db_res = get_database().await;
    // let db = db_res.lock().await;

    Err(FlusterError::NotImplemented)
}
