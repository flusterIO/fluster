use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::snippets::snippet_entity::SnippetEntity,
};

use super::{get_snippet_params::GetSnippetsParams, snippet_model::SnippetModel};

#[tauri::command]
#[specta::specta]
pub async fn get_snippets(opts: GetSnippetsParams) -> FlusterResult<Vec<SnippetModel>> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    SnippetEntity::get_many(db, opts).await
}

#[cfg(test)]
mod tests {

    use super::*;

    #[tokio::test]
    async fn gets_snippets_without_langs() {
        let items = get_snippets(GetSnippetsParams { langs: None }).await;
        println!("Data: {:?}", items);
        assert!(
            items.is_ok(),
            "Snippets are returned without throwing an error."
        );
        assert!(!items.unwrap().is_empty(), "Returned a non-empty list.");
        // assert_eq!(result, 4);
    }

    #[tokio::test]
    async fn gets_snippets_with_langs() {
        let items = get_snippets(GetSnippetsParams {
            langs: Some(vec!["python".to_string()]),
        })
        .await;
        println!("Data: {:?}", items);
        assert!(
            items.is_ok(),
            "Snippets are returned without throwing an error."
        );
        assert!(!items.unwrap().is_empty(), "Returned a non-empty list.");
        // assert_eq!(result, 4);
    }
}
