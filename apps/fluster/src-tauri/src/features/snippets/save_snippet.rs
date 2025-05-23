use sea_orm::Iden;
use sqlx::postgres::PgPoolOptions;

use crate::core::{
    db::db::get_database,
    types::{
        errors::errors::{FlusterError, FlusterResult},
        traits::db_entity::DbRecord,
    },
};

use super::snippet_model::SnippetItem;

#[tauri::command]
#[specta::specta]
pub async fn save_snippet(item: SnippetItem) -> FlusterResult<DbRecord> {
    let db_res = get_database().await;
    let mut db = db_res.lock().await;
    db.start_db()
        .await
        .map_err(|_| FlusterError::FailToConnect)?;
    let uri = db.full_db_uri("fluster");
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&uri)
        .await
        .map_err(|_| FlusterError::FailToConnect);
    Ok(DbRecord { id: "".to_string() })
}
