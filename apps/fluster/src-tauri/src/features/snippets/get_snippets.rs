use serde::{Deserialize, Serialize};
use specta::Type;
use sqlx::postgres::PgPoolOptions;

use crate::core::{
    db::db::get_database,
    types::errors::errors::{FlusterError, FlusterResult},
};

use super::snippet_model::SnippetItem;

#[derive(Type, Debug, Serialize, Deserialize)]
pub struct GetSnippetsParams {
    pub langs: Option<Vec<String>>,
}

#[tauri::command]
#[specta::specta]
pub async fn get_snippets(opts: GetSnippetsParams) -> FlusterResult<Vec<SnippetItem>> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    Err(crate::core::types::errors::errors::FlusterError::FailToFind)
}

#[cfg(test)]
mod tests {
    use sqlx::postgres::PgPoolOptions;

    use crate::core::{
        db::db::get_database,
        types::errors::errors::{FlusterError, FlusterResult},
    };

    use super::*;

    #[tokio::test]
    async fn gets_snippets() {
        let items = get_snippets(GetSnippetsParams {
            langs: Some(vec!["typescript".to_string()]),
        })
        .await;
        assert!(
            items.is_ok(),
            "Snippets are returned without throwing an error."
        );
        // assert_eq!(result, 4);
    }
}
