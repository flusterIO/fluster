use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::math::data::equation_entity::EquationEntity,
};

#[tauri::command]
#[specta::specta]
pub async fn delete_equation_by_id(id: String) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    EquationEntity::delete_by_id(&db, id).await
}
