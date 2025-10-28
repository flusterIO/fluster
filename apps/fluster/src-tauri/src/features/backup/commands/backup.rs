use crate::core::database::db::get_database;
use crate::core::types::errors::errors::{FlusterError, FlusterResult};
use crate::features::backup::data::backup_data::BackupData;
use crate::features::backup::data::v1::BackupDataV1;
use std::fs::File;
use std::io::Write;

#[tauri::command]
#[specta::specta]
pub async fn backup_database_objects(output_dir: String) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;

    let mut data = BackupDataV1::default();
    data.generate(&db).await?;

    let json_data = serde_json::to_string_pretty(&data).map_err(|e| {
        println!("Error: {:?}", e);
        FlusterError::FailToSerializeJson
    })?;

    println!("Data: {}", json_data);

    tokio::fs::create_dir_all(output_dir.clone())
        .await
        .map_err(|e| {
            eprintln!("Error: {:?}", e);
            FlusterError::FailToCreateFile
        });

    let output_path = std::path::Path::new(&output_dir).join("fluster_backup.json");

    println!("Output: {:#?}", output_path);

    let mut file = File::create(&output_path).map_err(|e| {
        println!("Error: {:?}", e);
        FlusterError::FailToCreateFile
    })?;

    file.write_all(json_data.as_bytes()).map_err(|e| {
        println!("Error: {:?}", e);
        FlusterError::FailToCreateFile
    })?;

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn backs_up_database() {
        let res =
            backup_database_objects("/Users/bigsexy/Desktop/fluster/test/backup/".to_string())
                .await;
        println!("Res: {:?}", res);
        assert!(res.is_ok(), "Backs up database without returning an error")
    }
}
