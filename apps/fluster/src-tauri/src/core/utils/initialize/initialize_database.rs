use crate::core::{
    database::{
        db::get_database_path,
        tables::{
            settings::create_setting_table, snippet::create_snippet_table,
            subject::create_subject_table, tag::create_tag_table, topic::create_topic_table,
        },
    },
    types::errors::errors::{FlusterError, FlusterResult},
};
use lancedb::connect;

#[tauri::command]
#[specta::specta]
pub async fn initialize_database() -> FlusterResult<()> {
    if let Ok(db_path) = get_database_path() {
        let db = connect(db_path.to_str().unwrap())
            .execute()
            .await
            .map_err(|_| FlusterError::FailToConnect)?;
        // Don't return errors on failure to create the table because it likely just means
        // that the table already exists. Add some more robust error handling here once
        // the rest of the functionality is in working order.
        let _ = create_tag_table(&db).await;
        let _ = create_subject_table(&db).await;
        let _ = create_topic_table(&db).await;
        let _ = create_snippet_table(&db).await;
        let _ = create_setting_table(&db).await;
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn initializes_database() {
        let app = tauri::test::mock_app();
        let handle = app.handle();
        initialize_database()
            .await
            .expect("Database initializes without throwing an error.");
    }
}
