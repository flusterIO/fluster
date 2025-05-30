use futures_util::TryStreamExt;
use lancedb::query::{ExecutableQuery, QueryBase};
use serde::{Deserialize, Serialize};
use serde_arrow::from_record_batch;
use specta::Type;

use crate::core::{
    db::{db::get_database, tables::table_paths::DatabaseTables},
    types::errors::errors::{FlusterError, FlusterResult},
};

use super::snippet_model::SnippetModel;

#[derive(Type, Debug, Serialize, Deserialize)]
pub struct GetSnippetsParams {
    pub langs: Option<Vec<String>>,
}

#[tauri::command]
#[specta::specta]
pub async fn get_snippets(opts: GetSnippetsParams) -> FlusterResult<Vec<SnippetModel>> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let tbl = db
        .open_table(DatabaseTables::Snippets.to_string())
        .execute()
        .await
        .map_err(|_| FlusterError::FailToFind)?;
    let mut query = tbl.query().select(lancedb::query::Select::All);
    if opts.langs.is_some() {
        let lang_string = opts.langs.unwrap().join(", ");
        query = query.only_if(format!("lang in ({})", lang_string))
    }
    let res = query
        .execute()
        .await
        .map_err(|_| FlusterError::FailToFind)?
        .try_collect::<Vec<_>>()
        .await
        .map_err(|_| FlusterError::FailToFind)?;
    let mut items: Vec<SnippetModel> = Vec::new();
    for snippet_batch in res.iter() {
        let batch_snippet: Vec<SnippetModel> =
            from_record_batch(snippet_batch).map_err(|_| FlusterError::FailToSerialize)?;
        items.extend(batch_snippet);
    }
    println!("Items: {:?}", items);
    Ok(items)
}

#[cfg(test)]
mod tests {

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
