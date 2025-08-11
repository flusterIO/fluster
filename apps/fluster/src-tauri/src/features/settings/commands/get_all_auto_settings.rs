use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::{
        search::types::PaginationProps,
        settings::data::{
            auto_setting_entity::AutoSettingEntity, auto_setting_model::AutoSettingModel,
        },
    },
};

#[tauri::command]
#[specta::specta]
pub async fn get_all_auto_settings(
    pagination: PaginationProps,
) -> FlusterResult<Vec<AutoSettingModel>> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    AutoSettingEntity::get_many(&db, &None, &pagination).await
}
