use sqlx::postgres::PgPoolOptions;

use crate::core::{
    db::{
        db::{get_database, get_database_uri},
        utils::{start_db, stop_db},
    },
    types::errors::errors::{FlusterError, FlusterResult},
};

#[tauri::command]
#[specta::specta]
pub async fn delete_snippet_by_id(id: i32) -> FlusterResult<()> {
    let db_res = get_database().await;
    let mut db = db_res.lock().await;
    let uri = get_database_uri();
    let start_res = start_db(&mut db).await;
    if start_res.is_err() {
        println!("Error while starting database: {:?}", start_res.err());
    }
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&uri)
        .await
        .map_err(|_| FlusterError::FailToConnect)?;
    let res = sqlx::query("DELETE FROM snippet WHERE id = $1")
        .bind(id)
        .execute(&pool)
        .await
        .map_err(|_| FlusterError::FailToDelete)?;
    if res.rows_affected() == 1 {
        stop_db(&mut db).await;
        Ok(())
    } else {
        stop_db(&mut db).await;
        Err(FlusterError::FailToDelete)
    }
}
