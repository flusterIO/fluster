use crate::core::{
    db::db::get_database,
    models::taggable::tag_model::Tag,
    types::errors::errors::{FlusterError, FlusterResult},
};

use super::snippet_model::SnippetItem;

#[tauri::command]
#[specta::specta]
pub async fn get_snippet_by_id(id: i32) -> FlusterResult<(SnippetItem, Vec<Tag>)> {
    let db_res = get_database().await;
    let db = db_res.lock().await;

    Err(FlusterError::NotImplemented)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn gets_snippet_by_id() {
        let _id = 1;
        let (snippet, _) = get_snippet_by_id(_id)
            .await
            .expect("Returns a response without throwing an error.");
        assert_eq!(snippet.id, Some(_id), "Returns the proper snippet.");
    }
}
