use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::settings::data::{
        auto_setting_entity::AutoSettingEntity, auto_setting_model::AutoSettingModel,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn create_auto_setting(data: Vec<AutoSettingModel>) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    AutoSettingEntity::save_many(&db, &data).await
}
