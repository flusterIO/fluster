use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::math::data::{equation_entity::EquationEntity, equation_model::EquationModel},
};

#[tauri::command]
#[specta::specta]
pub async fn get_equations() -> FlusterResult<Vec<EquationModel>> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    EquationEntity::get_many(&db).await
}
