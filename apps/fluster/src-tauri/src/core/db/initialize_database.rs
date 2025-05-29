use crate::core::{
    db::utils::{start_db, stop_db},
    types::errors::errors::{FlusterError, FlusterResult},
};
use lancedb::connect;
use tauri::{AppHandle, Runtime};

use super::{
    db::get_database_path,
    tables::{subject::create_subject_table, tag::create_tag_table, topic::create_topic_table},
};

pub async fn initialize_database<T: Runtime>(app: &AppHandle<T>) -> FlusterResult<()> {
    let vector_dims = 768;
    if let Some(db_path) = get_database_path() {
        let db = connect(db_path.to_str().unwrap())
            .execute()
            .await
            .map_err(|_| FlusterError::FailToConnect)?;
        create_tag_table(&db).await?;
        create_subject_table(&db).await?;
        create_topic_table(&db).await?;
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
        initialize_database(handle)
            .await
            .expect("Database initializes without throwing an error.");
    }
}
