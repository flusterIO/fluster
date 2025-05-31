use crate::core::{database::db::get_database, types::errors::errors::FlusterResult};

use super::settings_entity::SettingsEntity;

#[tauri::command]
#[specta::specta]
pub async fn delete_setting_state(settings_id: String) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    SettingsEntity::delete_settings(&db, settings_id).await?;
    Ok(())
}
