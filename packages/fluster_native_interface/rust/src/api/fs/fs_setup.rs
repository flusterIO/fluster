use std::path::PathBuf;

use crate::api::data_interface::get_database_status::{get_database_status, FlusterDatabaseStatus};
pub use crate::api::forced_imports::*;
pub use fluster_types::errors::errors::FlusterError;
use flutter_rust_bridge::frb;

#[frb(ignore)]
fn make_dir_or_fail_to_create(p: PathBuf) -> Option<FlusterError> {
    if !p.exists() {
        let dir_err = std::fs::create_dir_all(p);
        if dir_err.is_err() {
            Some(FlusterError::FailToCreatePath)
        } else {
            None
        }
    } else {
        None
    }
}

pub async fn setup_file_system_for_data() -> Vec<FlusterError> {
    let data_dir = dirs::data_dir().or(dirs::data_local_dir());
    let status = get_database_status().await;
    let mut errors: Vec<FlusterError> = Vec::new();
    if let Some(dir_name) = data_dir {
        if let Some(res) =
            make_dir_or_fail_to_create(dir_name.join("Fluster").join("data").join("database"))
        {
            errors.push(res);
        }
        if let Some(res) = make_dir_or_fail_to_create(dir_name.join("Fluster").join("logs")) {
            errors.push(res);
        }
        if let Some(res) = make_dir_or_fail_to_create(dir_name.join("Fluster").join("tmp")) {
            errors.push(res);
        }
        if status == FlusterDatabaseStatus::NotInitialized {
            fluster_db::api::embedded_schema::seed_schema().await;
        }
    } else {
        errors.push(FlusterError::DataDirNotFound())
    }
    errors
}

#[cfg(test)]
mod tests {
    use std::collections::HashMap;

    use fluster_db::api::db::get_database;

    use super::*;

    #[tokio::test]
    async fn sets_up_file_system_properly() {
        let res = setup_file_system_for_data().await;
        assert!(res.is_empty(), "Setup file system without errors");
        // assert_eq!(result, 4);
    }

    #[tokio::test]
    async fn seeds_database_without_error() {
        struct DbInfo {
            tables: HashMap<String, String>,
        }
        let d = setup_file_system_for_data().await;
        assert!(d.is_empty(), "Seeding database returns no errors.");
        let db = get_database()
            .await
            .expect("Returns database without throwing an error.");
        let q: Vec<surrealdb::Value> = db
            .query("SELECT * from mdx_notes;")
            .await
            .expect("Query runs without throwing an error")
            .take(0)
            .expect("Returns first result without throwing an error.");
        // assert!(q.is_empty(), "Created mdx_notes table successfully.");
    }
}
