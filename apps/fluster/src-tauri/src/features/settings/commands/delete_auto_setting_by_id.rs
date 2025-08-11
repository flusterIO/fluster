use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::settings::data::auto_setting_entity::AutoSettingEntity,
};

#[tauri::command]
#[specta::specta]
pub async fn delete_auto_setting_by_id(id: String) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    AutoSettingEntity::delete_by_id(&db, id).await
}
