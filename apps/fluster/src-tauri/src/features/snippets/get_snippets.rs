use sea_query::Query;
use sqlx::{Pool, Postgres};

use crate::core::types::{errors::errors::FlusterResult, FlusterDb};

use super::snippet_model::SnippetItem;

pub struct GetSnippetsParams {
    pub langs: Option<Vec<String>>,
}

pub async fn get_snippets(
    opts: GetSnippetsParams,
    pool: Pool<Postgres>,
) -> FlusterResult<Vec<SnippetItem>> {
    let mut s = "SELECT * from snippet".to_owned();
    if opts.langs.is_some() {
        s.push_str(" WHERE lang in ($1)");
    }

    let res_data = sqlx::query_as::<_, SnippetItem>(s.as_str())
        .bind(opts.langs.unwrap().join(", "))
        .fetch_all(&pool)
        .await;
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
            .map_err(|_| FlusterError::FailToConnect)
            .expect("Returns a connection pool withoutthrowing an error.");
        let items = get_snippets(
            GetSnippetsParams {
                langs: Some(vec!["typescript".to_string()]),
            },
            pool,
        )
        .await;
        assert!(
            items.is_ok(),
            "Snippets are returned without throwing an error."
        );
        // assert_eq!(result, 4);
    }
}
