use sqlx::postgres::PgPoolOptions;

use crate::core::{
    db::db::get_database,
    models::taggable::{tag_model::Tag, tag_snippet_join::TagSnippetJoin},
    types::errors::errors::{FlusterError, FlusterResult},
};

use super::snippet_model::SnippetItem;

#[tauri::command]
#[specta::specta]
pub async fn get_snippet_by_id(id: i32) -> FlusterResult<(SnippetItem, Vec<Tag>)> {
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
    let res = sqlx::query_as::<_, SnippetItem>("SELECT * FROM snippet WHERE id = $1")
        .bind(id)
        .fetch_one(&pool)
        .await
        .map_err(|_| FlusterError::FailToDelete)?;
    let tag_snippet_joins =
        sqlx::query_as::<_, TagSnippetJoin>("SELECT * FROM tag_snippet_join WHERE snippet_id = $1")
            .bind(id)
            .fetch_all(&pool)
            .await
            .map_err(|_| FlusterError::FailToFindById)?;
    let mut tag_ids: Vec<i32> = Vec::new();
    for tag_join in tag_snippet_joins.iter() {
        tag_ids.push(tag_join.tag_id);
    }
    let tags = sqlx::query_as::<_, Tag>("SELECT * FROM tag WHERE id = ANY($1)")
        .bind(tag_ids)
        .fetch_all(&pool)
        .await
        .map_err(|_| FlusterError::FailToFindById)?;

    Ok((res, tags))
}
