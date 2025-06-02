use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::math::data::{equation_entity::EquationEntity, equation_model::EquationModel},
};

#[tauri::command]
#[specta::specta]
pub async fn save_equations(data: Vec<EquationModel>) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    EquationEntity::save_many(&db, data).await
}
