use std::ops::Index;

use crate::{
    core::{
        database::db::get_database,
        types::errors::errors::{FlusterError, FlusterResult},
    },
    features::math::{
        data::{
            equation_entity::EquationEntity,
            equation_model::{EquationData, EquationModel},
        },
        utils::equations_to_equationdata::equations_to_equationdata,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn get_equation_by_id(id: String) -> FlusterResult<EquationData> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let equation = EquationEntity::get_by_id(&db, id.clone()).await?;
    let equation_data = equations_to_equationdata(&db, &vec![equation.clone()]).await?;
    if equation_data.len() == 1 {
        Ok(equation_data.index(0).clone())
    } else {
        Err(FlusterError::NotFoundById)
    }
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
