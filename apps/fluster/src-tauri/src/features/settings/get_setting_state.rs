use crate::core::{database::db::get_database, types::errors::errors::FlusterResult};

use super::settings_entity::SettingsEntity;

#[tauri::command]
#[specta::specta]
pub async fn get_setting_state(settings_id: String) -> FlusterResult<String> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let res = SettingsEntity::get_settings(&db, settings_id).await?;
    Ok(res)
}
