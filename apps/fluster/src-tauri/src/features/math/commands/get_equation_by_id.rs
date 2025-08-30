use crate::{
    core::{
        database::db::get_database, models::taggable::tag_entity::TagEntity,
        types::errors::errors::FlusterResult,
    },
    features::math::data::{
        equation_entity::EquationEntity,
        equation_model::{EquationData, EquationModel},
        equation_tag_entity::EquationTagEntity,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn get_equation_by_id(id: String) -> FlusterResult<EquationData> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let equation = EquationEntity::get_by_id(&db, id.clone()).await?;
    let equation_tags = EquationTagEntity::get_by_equation_ids(&db, vec![id]).await?;
    let tags = TagEntity::get_by_values(
        &db,
        equation_tags.iter().map(|x| x.tag_value.clone()).collect(),
    )
    .await?;
    Ok(EquationData { equation, tags })
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
