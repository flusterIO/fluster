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
    let mut db = db_res.lock().await;
    let uri = db.full_db_uri("fluster");
    let start_res = db.start_db().await;
    if start_res.is_err() {
        println!("Error while starting database: {:?}", start_res.err());
    }
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&uri)
        .await
        .map_err(|_| FlusterError::FailToConnect)?;
    let mut s = "SELECT * FROM snippet".to_owned();
    if let Some(langs) = &opts.langs {
        if !langs.is_empty() {
            let params = format!("?{}", ", ?".repeat(langs.len() - 1));
            s = "SELECT * FROM snippet WHERE lang = ANY($1)".to_owned();
        }
    }

    let mut query = sqlx::query_as::<_, SnippetItem>(s.as_str());
    if let Some(langs) = &opts.langs {
        query = query.bind(langs);
        // for lang in langs {
        // query = query.bind(lang);
        // }
    }
    // .bind(opts.langs.unwrap().join(", "))
    // .fetch_all(&pool)
    // .await;
    let res_data = query.fetch_all(&pool).await;
    if let Ok(res) = res_data {
        println!("Res items: {:?}", res);
        return Ok(res);
    } else {
        println!("An error occurred while retrieving snippets.");
        println!("Error: {:?}", res_data.err());
    }
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
