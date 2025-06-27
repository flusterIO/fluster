use crate::core::{
    database::{
        db::{get_database, get_table},
        tables::table_paths::DatabaseTables,
    },
    types::errors::errors::{FlusterError, FlusterResult},
};

#[tauri::command]
#[specta::specta]
pub async fn get_note_count(predicate: Option<String>) -> FlusterResult<usize> {
    let db_res = get_database().await;
    let db = db_res.lock().await;

    let tbl = get_table(&db, DatabaseTables::MdxNote).await?;

    let count = tbl.count_rows(predicate).await.map_err(|x| {
        println!("Error: {:?}", x);
        FlusterError::FailToCount
    })?;
    Ok(count)
}
