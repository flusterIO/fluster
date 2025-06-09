use crate::core::{database::db::get_database, types::errors::errors::FlusterResult};

use super::settings_entity::SettingsEntity;

#[tauri::command]
#[specta::specta]
pub async fn save_setting_state(json_string: String, settings_id: String) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    SettingsEntity::save(&db, json_string, settings_id).await?;
    Ok(())
}
