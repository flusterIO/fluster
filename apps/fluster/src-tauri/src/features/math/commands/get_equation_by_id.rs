use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::math::data::{equation_entity::EquationEntity, equation_model::EquationModel},
};

#[tauri::command]
#[specta::specta]
pub async fn get_equation_by_id(id: String) -> FlusterResult<EquationModel> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    EquationEntity::get_by_id(&db, id).await
}

#[tauri::command]
#[specta::specta]
pub async fn get_equation_by_user_provided_id(
    id: Vec<String>,
) -> FlusterResult<Vec<EquationModel>> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    EquationEntity::get_by_user_provided_ids(&db, id).await
}
