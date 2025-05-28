use sqlx::postgres::PgPoolOptions;

use crate::core::{
    db::db::{get_database, get_database_uri},
    models::taggable::{tag_model::Tag, tag_snippet_join::TagSnippetJoin},
    types::errors::errors::{FlusterError, FlusterResult},
};

use super::snippet_model::SnippetItem;

#[tauri::command]
#[specta::specta]
pub async fn get_snippet_by_id(id: i32) -> FlusterResult<(SnippetItem, Vec<Tag>)> {
    let db_res = get_database().await;
    let mut db = db_res.lock().await;
    let uri = get_database_uri();
    let start_res = db.start().await;
    if start_res.is_err() {
        println!("Error while starting database: {:?}", start_res.err());
    }
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&uri)
        .await
        .map_err(|_| FlusterError::FailToConnect)?;
    let res = sqlx::query_as::<_, SnippetItem>("SELECT * FROM snippet WHERE id = $1")
        .bind(id)
        .fetch_one(&pool)
        .await
        .map_err(|e| {
            println!("Error in snippet query - {:?}", e);
            FlusterError::FailToFindById
        })?;
    let tag_snippet_joins =
        sqlx::query_as::<_, TagSnippetJoin>("SELECT * FROM tag_snippet_join WHERE snippet_id = $1")
            .bind(id)
            .fetch_all(&pool)
            .await
            .map_err(|e| {
                println!("Error in tag_snippet query - {:?}", e);
                FlusterError::NotImplemented
            })?;
    let mut tag_ids: Vec<i32> = Vec::new();
    for tag_join in tag_snippet_joins.iter() {
        tag_ids.push(tag_join.tag_id);
    }
    let tags = match sqlx::query_as::<_, Tag>("SELECT * FROM tag WHERE id = ANY($1)")
        .bind(tag_ids)
        .fetch_all(&pool)
        .await
    {
        Ok(x) => x,
        Err(e) => {
            println!("Error in get_snippet_by_id: {:?}", e);
            Vec::new()
        }
    };

    Ok((res, tags))
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
