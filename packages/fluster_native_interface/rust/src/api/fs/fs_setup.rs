use std::path::PathBuf;

pub use crate::api::forced_imports::*;
use fluster_db::api::db::get_database;
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
    let mut errors: Vec<FlusterError> = Vec::new();
    if let Some(dir_name) = data_dir {
        let has_initialized = dir_name.join("Fluster").join("data").exists();
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
        if !has_initialized {
            let db = get_database().await;
            fluster_db::api::embedded_schema::seed_schema(db.unwrap()).await;
        }
    } else {
        errors.push(FlusterError::DataDirNotFound())
    }
    errors
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn sets_up_file_system_properly() {
        let res = setup_file_system_for_data().await;
        assert!(res.is_empty(), "Setup file system without errors");
        // assert_eq!(result, 4);
    }
}
